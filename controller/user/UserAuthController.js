import userModel from '../../models/userModel.js'
import tokenModel from '../../models/tokenModel.js'
import { sendMailer } from '../../utils/sendMailer.js'
import { securePassword } from '../../utils/securePassword.js'
import crypto from 'crypto'



// INSERT USER SIGN UP DETAILS

export const insertUser = async (req,res) =>{
    try{
        const {name,email,password} = req.body
        const sPassword = await securePassword(password)
        const emailExist = await userModel.findOne({email:email})

        console.log(emailExist);

        if(emailExist){
            return res.status(400).json({message:'email all ready exist'})
        }else{
            const user = new userModel({
                name,
                email,
                password:sPassword,
                is_admin:0,
                is_block:0,
                is_verified:0,
            })
            const userData = await user.save()
            if(userData){
                const token = await new tokenModel({
                    userId:userData._id,
                    token:crypto.randomBytes(32).toString('hex')
                }).save();
                
                const url = `${process.env.BASE_URL}/users/${userData._id}/verify/${token.token}`        
                sendMailer(
                    userData.name,
                    userData.email,
                    url,
                    'Travello verify email'
                    )
                res.status(200).json({message:'An email send to your account verify'})
            }else{
                res.status(400).json({message:"can't registered, somthing went wroung" })
            }
        }
    }catch(err){
        console.log(err)
    }
}


// USER EMAIL VERIFICATION FUNCTION

export const verifyUser = async (req,res) =>{
    try{
        console.log(req.params,'is working')
        const userToken = await userModel.findOne({
            toke:req.params.token,
            userId:req.params.id,
        })
        console.log(userToken)
        if(!userToken){
            return res.status(400).json({message:'Your verification link may have expired. Please click on resend for verify your Email.'})
        }else{
            const user = await userModel.findById({
                _id:req.params.id
            })
            if(!user){
                return res.status(400).json({message:'We were unable to find a user for this verification. Please SignUp!'})
            }else if(user.is_verified){
                return res.status(200).json({message:'User has been already verified. Please Login'})
            }else{
                const update = await userModel.updateOne({
                    _id:req.params.id},{
                        $set:{
                            is_verified:true
                        }    
                    })
                if(update){
                    return res.status(200).json({message:'Your account has been successfully verified'})
                }
            }
        }
    }catch(err){
        console.log(err)
    }
}

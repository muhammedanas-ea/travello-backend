import ownerModel from '../../models/propertyOwnerModel.js'
import { sendMailer } from '../../utils/sendMailer.js'
import { securePassword } from '../../utils/securePassword.js'

export const insertPropertyOwner = async (req,res) =>{
    try{
        const {email,name,number,password} = req.body
        const sPassword = await securePassword(password)
        const emailExist = await ownerModel.findOne({email:email})

        if(emailExist){
            return res.status(400).json({message:'email all ready exist'})
        }else{
            const owner = new ownerModel({
                name,
                number,
                email,
                password:sPassword,
            })
            const ownerData = await owner.save()
           
            if(ownerData){
                const genartedOtp = Math.floor(Math.random() * 9000) + 1000;
                console.log(genartedOtp);
                sendMailer(
                    ownerData.name,
                    ownerData.email,
                    genartedOtp,
                    'Travello property owner otp verification'
                )
            }else{
                res.status(400).json({message:"can't registered, somthing went wroung" })
            }
        }
    }catch(err){
        console.log(err);
    }
}
import userModel from '../../models/userModel.js'


export const userDetails = async (req,res) =>{
    try{
        const userData = await userModel.find({is_verified:true})
        if(!userData){
            res.status(200).json({status:false,message:'not exist useData'})
        }else{
            res.status(200).json({
                status:true,
                userData,
                message:'user data sent'
            })
        }
    }catch(err){
        console.log(err)
    }
} 
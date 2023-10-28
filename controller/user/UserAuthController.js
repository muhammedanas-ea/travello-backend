import User from '../../models/userModeal/userModel.js'
import bcrypt from 'bcrypt'


// PASSSWORD HASHING SECTION 

const securePassword = async (password) =>{
    try{
        let passwordHash = await bcrypt.hash(password,10);
        return passwordHash
    }catch(err){
        console.log(err)
    }
}


// INSERT USER SIGN UP DETAILS

export const insertUser = async (req,res,next) =>{
    try{
        const {name,email,password} = req.body
        const sPassword = await securePassword(password);
        const emailExist = await User.findOne({email})

        if(emailExist){
            return res.status(400).json({message:'email all ready exist'})
        }
        const user = new User({
            name,
            email,
            password:sPassword,
            is_admin:0,
            is_block:0,
            is_verified:0,
        })
        const userData = await user.save()
        if(userData){
            
        }

    }catch(err){
        console.log(err)
        next()
    }
}

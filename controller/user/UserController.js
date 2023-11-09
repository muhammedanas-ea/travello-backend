import propertyModel from '../../models/propertyModal.js'


export const userPropertyList = async (req,res) =>{
    try{
        const propertyData = await propertyModel.find({Is_approve:true,Is_block:false})
        res.status(200).json(propertyData)
    }catch(err){
        console.log(err)
    }
}
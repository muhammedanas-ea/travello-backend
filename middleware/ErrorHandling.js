export const errorHandler = (err, req, res, next) =>{
    console.log(err);
    res.status(404).json({message:'404 error'})
}
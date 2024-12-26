const contactModel=require('../model/contactModel')
module.exports.inquiresController=async(req,res)=>{
    try{
        const inquires=await contactModel.find();
        res.status(200).json({message:'inquires fetched sucessfully',data:inquires})
    }
    catch(error)
    {
        res.status(500).json({error:'failed to fetch inquires',details:error.message    })
    }
    

}
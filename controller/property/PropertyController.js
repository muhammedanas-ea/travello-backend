import propertyModel from "../../models/propertyModal.js";
import jwt from "jsonwebtoken";

export const addProperty = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const dicout = jwt.verify(token, process.env.SECRET_KEY);

    const {
      propertyName,
      price,
      room,
      gust,
      state,
      location,
      propertyType,
      number,
      describe,
      amenities,
    } = req.body;

    const images = [];
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        images.push(req.files[i].filename);
      }
    }

    const propertyData = new propertyModel({
      PropertyName: propertyName,
      Price: price,
      RoomCount: room,
      GuestCount: gust,
      City: location,
      State: state,
      MobileNumber: number,
      Description: describe,
      PropertyType: propertyType,
      Amenities: amenities,
      propertOwner: dicout.userId,
      Image: images,
    });
    await propertyData.save();
    if (!propertyData) {
      return res.status(400).json({ message: "propert add have error" });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "property add complted" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const ownerListProperty = async (req, res) => {
  try {
    const propertyData = await propertyModel
      .find({ propertOwner: req.params.id })
      .populate("propertOwner");
    if (!propertyData) {
      return res.status(400).json({ message: "property list have error" });
    } else {
      return res.status(200).json({
        status: true,
        propertyData,
        message: "property list Completed",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const propertyDetails = async (req,res) =>{
  try{
    const propertyData = await propertyModel
      .findOne({ _id: req.params.id })
      .populate("propertOwner");
    res.status(200).json({ propertyData });
  }catch(err){
    console.log(err)
  }
} 

export const bookingDetails = async (req,res) =>{
  try{
     const bookingData = await propertyModel.find({propertOwner:req.params.id}).populate('bookings')
     res.status(200).json(bookingData)
  }catch(err){
    console.log(err)
  }
}
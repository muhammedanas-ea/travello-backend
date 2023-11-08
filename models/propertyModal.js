import mongoose from "mongoose";

const { Schema } = mongoose;

const PropertySchema = new Schema({
  Price: {
    type: Number,
    required: true,
  },
  PropertyName: {
    type: String,
    required: true,
  },
  RoomCount: {
    type: Number,
    required: true,
  },
  GuestCount: {
    type: String,
    required: true,
  },
  MobileNumber: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  PropertyType: {
    type: String,
    required: true,
  },
  Image: [
    {
      type: String,
    },
  ],
  Is_block: {
    type: Boolean,
  },
  Amenities: [
    {
      type: String,
      required: true,
    },
  ],
  Is_delete: {
    type: Boolean,
  },
  propertOwner:{
    type: Schema.Types.ObjectId,
    ref: 'PropertyOwner',
    required: true,
  }
});

const Property = mongoose.model("Property", PropertySchema);

export default Property;

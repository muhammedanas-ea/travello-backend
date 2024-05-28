import mongoose from "mongoose";

const { Schema } = mongoose;

const PropertySchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  modelnumber: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  waranty: {
    type: Number,
    required: true,
  },
  discrption: {
    type: String,
    required: true,
  },
  Image: [
    {
      type: String,
    },
  ],
  Is_approve: {
    type: Boolean,
    default: false,
  },
  Is_reject: {
    type: Boolean,
    default: false,
  },
  distributer_id: {
    type: Schema.Types.ObjectId,
    ref: "distributor",
    required: true,
  },
});

const Property = mongoose.model("Property", PropertySchema);

export default Property;

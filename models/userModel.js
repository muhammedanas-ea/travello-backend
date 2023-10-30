import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
  },
  houseName: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  postOffice: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  is_block: {
    type: Boolean,
  },
  is_verified: {
    type: Boolean,
  },
  is_admin: {
    type: Boolean,
  },
});

const Users = mongoose.model("Users", UsersSchema);

export default Users;

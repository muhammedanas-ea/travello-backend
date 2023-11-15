import mongoose from "mongoose";

const { Schema } = mongoose;

const BookingsSchema = new Schema({
  CheckOut: {
    type: Date,
  },
  ChekIn: {
    type: Date,
  },
  Address: {
    City: {
      type: String,
    },
    Email: {
      type: String,
    },
    Mobile: {
      type: String,
    },
    Name: {
      type: String,
    },
  },
  TotalGuest: {
    type: Number,
  },
  TotalRooms: {
    type: Number,
  },
  TotalRate: {
    type: Number,
  },
  bookingStatus: {
    type: String,
    default: "pending",
  },
  PropertyId: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required:true
  },
  UsersId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required:true
  },
});

const Bookings = mongoose.model("Bookings", BookingsSchema);

export default Bookings;

import propertyModel from "../../models/propertyModal.js";
import usersModel from "../../models/userModel.js";
import bookingModel from "../../models/bookingModal.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const userPropertyList = async (req, res) => {
  try {
    const { active, sort } = req.params;
    const page = (active - 1) * 6;
    const query = { Is_approve: true, Is_block: false };
    let sortValue;

    if (sort === "highToLow") {
      sortValue = -1;
    } else if (sort === "lowToHigh") {
      sortValue = 1;
    }

    const totalProperty = await propertyModel.countDocuments(query);

    const propertyData = await propertyModel
      .find(query)
      .skip(page)
      .limit(9)
      .sort({ Price: sortValue });
    const totalPages = Math.ceil(totalProperty / 9);

    if (!propertyData) {
      res
        .status(200)
        .json({ status: false, message: "not exist property data" });
    } else {
      res.status(200).json({
        status: true,
        propertyData,
        totalPages,
        message: "user data sent",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, number, houseName, state, city } =
      req.body.profileData;

    const userProfileUpdate = await usersModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          name,
          email,
          number,
          houseName,
          state,
          city,
        },
      },
      {
        new: true,
      }
    );

    if (!userProfileUpdate) {
      return res.status(400).json({ message: "Your profile not updated" });
    } else {
      return res.status(200).json({
        status: true,
        message: "your profile updated",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchProfileData = async (req, res) => {
  try {
    const userData = await usersModel.findOne({ _id: req.params.id });
    return res.status(200).json(userData);
  } catch (err) {
    console.log(err);
  }
};

export const userSinglePropertyList = async (req, res) => {
  try {
    const propertyData = await propertyModel.findOne({ _id: req.params.id });
    return res.status(200).json({
      status: true,
      message: "singleproperty data get it",
      propertyData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userBookingDetails = async (req, res) => {
  try {
    const {
      totalAmount,
      roomCount,
      increment,
      startDate,
      endDate,
      _id,
      userId,
    } = req.body;

    const propertyData = await propertyModel.findById(_id);

    const overlappingBookings = await bookingModel.aggregate([
      {
        $match: {
          PropertyId: new ObjectId(_id),
          $and: [
            { ChekIn: { $lte: new Date(endDate) } },
            { CheckOut: { $gte: new Date(startDate) } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          totalCount: { $sum: "$TotalRooms" },
        },
      },
    ]);

    if (overlappingBookings.length > 0) {
      const [{ totalCount }] = overlappingBookings;
      if (totalCount + roomCount > propertyData.RoomCount) {
        return res
          .status(400)
          .json({ message: "Room not available for these dates" });
      }
    }else {
      const booking = new bookingModel({
        ChekIn: startDate,
        CheckOut: endDate,
        TotalGuest: increment,
        TotalRooms: roomCount,
        TotalRate: totalAmount,
        PropertyId: _id,
        UsersId: userId,
      });
      await booking.save().then(() => {
        return res
          .status(200)
          .json({
            status:true,
            meessage: "room is available in this date",
            id: booking._id,
            totalAmount,
          });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

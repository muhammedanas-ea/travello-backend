import userModel from "../../models/userModel.js";

export const userDetails = async (req, res) => {
  try {
    const { active, search } = req.params;
    const page = (active - 1) * 6;
    const query = { is_verified: true };

    if (search != 0) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    const totalUser = await userModel.countDocuments(query);
    const userData = await userModel
      .find(query)
      .skip(page)
      .limit(8)
      .sort({ name: 1 });
    const totalPages = Math.ceil(totalUser / 8);

    if (!userData) {
      res.status(200).json({ status: false, message: "not exist useData" });
    } else {
      res.status(200).json({
        status: true,
        userData,
        totalPages,
        message: "user data sent",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const userBlock = async (req, res) => {
  try {
    const id = req.body._id;
    const update = await userModel.updateOne(
      { _id: id },
      { $set: { is_block: true } }
    );
    if (!update) {
      res.status(400).json({ message: "user block not completed" });
    } else {
      res.status(200).json({
        status: true,
        message: "that user is blocked",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const userUnblock = async (req, res) => {
  try {
    const id = req.body.id;
    const update = await userModel.updateOne(
      { _id: id },
      { $set: { is_block: false } }
    );
    if (!update) {
      res.status(400).json({ message: "user block not completed" });
    } else {
      res.status(200).json({
        status: true,
        message: "that user is unblocked",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// import userModel from '../../models/userModel'
import Chat from "../../models/chatModal.js";
import Message from "../../models/messageModal.js";
import Owner from "../../models/propertyOwnerModel.js";
import User from '../../models/userModel.js'

export const AccessChat = async (req, res) => {
  const { userId, ownerId } = req.body;

  if (!userId) {
    console.log("User not found");
    return res.status(400);
  }

  try {
    // Find a chat where the doctor's ID matches doctorId and the user's ID matches userId
    let isChat = await Chat.findOne({
      "users.owner": ownerId,
      "users.user": userId,
    })
      .populate("users.user", "-password") // Populate the "user" references
      .populate("users.owner", "-password") // Populate the "doctor" references
      .populate("latestMessage");
    console.log(isChat);
    // If a chat exists, send it
    if (isChat) {
      console.log(isChat);
      res.status(200).json(isChat);
    } else {
      // If a chat doesn't exist, create a new one
      const chatData = {
        chatName: "sender",
        users: {
          owner: ownerId,
          user: userId,
        },
      };

      const createdChat = await Chat.create(chatData);
      console.log(createdChat);

      // Populate the "users" field in the created chat

      const FullChat = await Chat.findOne({ _id: createdChat._id })
        .populate("users.user", "-password")
        .populate("users.owner", "-password")
        .populate("latestMessage")
        .populate({
          path: "latestMessage",
          populate: {
            path: "sender.owner" ? "sender.owner" : "sender.user",
            select: "-password",
          },
        });
      console.log(FullChat, "full");
      res.status(200).json(FullChat);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const SearchUserChat = async (req, res) => {
  try {
    const keyword = req.params.search
      ? {
          $or: [
            { name: { $regex: req.params.search, $options: "i" } },
            { email: { $regex: req.params.search, $options: "i" } },
          ],
        }
      : {};

    const users = await Owner.find(keyword);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

export const FetchChats = async (req, res) => {
  try {
    const { userId } = req.params;
    await Chat.find({ "users.user": userId })
      .populate("users.user", "-password")
      .populate("users.owner", "-password")
      .populate("latestMessage")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender.owner" ? "sender.owner" : "sender.user",
          select: "-password",
        },
      })
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender.user",
          select: "-password",
        },
      })
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
};

export const SendMessage = async (req, res) => {
  try {
    const { content, chatId, userId } = req.body;
    if (!content || !chatId) {
      console.log("Invalid parameters");
      return res.status(400);
    }
   
    const newMessage = {
      sender: { user: userId },
      content: content,
      chat: chatId,
    };

    let message = await Message.create(newMessage);

    message = await message.populate("sender.user", "name");
    message = await message.populate("chat");

    message = await User.populate(message, [
      {
        path: "chat.users.user",
        select: "name email",
      },
    ]);

    let data = await Chat.findByIdAndUpdate(
      chatId,
      {
        latestMessage: message,
      },
      { new: true }
    );

    res.json(message);
  } catch (err) {
    console.log(err);
  }
};

export const AllMessages = async (req, res) => {
  try {
    const message = await Message.find({ chat: req.params.chatId })
      .populate("sender.user", "name email")
      .populate("sender.owner", "name");
    res.json(message);
  } catch (error) {
    console.log(error.message);
  }
};

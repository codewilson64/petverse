import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

// Get Notifications
export const getNotifications = async (req, res) => {
  const userId = req.user._id

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const notifications = await Notification.find({ to: user._id })
      .sort({ createdAt: -1 })
      .populate("from", "username fullName profilePicture")
      .populate("post", "content image")
      .populate("comment", "content")

    res.status(200).json(notifications)
  } catch (error) {
    console.error("Error in getNotifications controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Notifications
export const deleteNotification = async (req, res) => {
  const userId = req.user._id
  const { notificationId } = req.params

  try {
    const user = await User.findById(userId);;
    if (!user) return res.status(404).json({ error: "User not found" });

    const notification = await Notification.findOneAndDelete({
        _id: notificationId,
        to: user._id,
    });

    if (!notification) return res.status(404).json({ error: "Notification not found" });

    res.status(200).json(notification)
  } catch (error) {
    console.error("Error in deleteNotification controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
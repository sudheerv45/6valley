// models/socialMediaChat.model.js
const mongoose = require('mongoose');

const socialMediaChatSchema = new mongoose.Schema(
  {
    whatsappNumber: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SocialMediaChat = mongoose.model('SocialMediaChat', socialMediaChatSchema);

module.exports = SocialMediaChat;
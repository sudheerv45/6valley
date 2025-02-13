const mongoose = require('mongoose');

const socialMediaChatSchema = new mongoose.Schema(
  {
    whatsappNumber: {
      type: String,
      required: [true, 'WhatsApp number is required.'],
      match: [/^\+[1-9]{1}[0-9]{3,14}$/, 'Please provide a valid international WhatsApp number starting with a + sign.']
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

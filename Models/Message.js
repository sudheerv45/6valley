const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderType: { type: String, enum: ["customer", "deliveryMan"], required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, refPath: "senderType", required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ["unread", "read"], default: "unread" },
});

module.exports = mongoose.model("Message", messageSchema);

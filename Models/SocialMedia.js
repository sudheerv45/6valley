const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    link: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SocialMedia", socialMediaSchema);

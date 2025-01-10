const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    // customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    customerId: {type: String, required:true},
    issue: { type: String, required: true },
    status: { type: String, enum: ["open", "in-progress", "resolved", "closed"], default: "open" },
    response: { type: String }, // Admin response
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", ticketSchema);

const mongoose = require('mongoose');

const deliveryManSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    idType: { type: String, required: true }, // e.g., "Passport", "Driver's License"
    idNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    image: { type: String }, // URL or path to the image
    idImage: { type: String }, // URL or path to the ID image
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const DeliveryMan = mongoose.model('DeliveryMan', deliveryManSchema);

module.exports = DeliveryMan;

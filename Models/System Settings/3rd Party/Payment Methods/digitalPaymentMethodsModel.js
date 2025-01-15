const mongoose = require('mongoose');

const digitalPaymentMethodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    type: {
        type: String,
        enum: ['live', 'test'],
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    publicKey: {
        type: String,
        required: true,
    },
    paymentGatewayTitle: {
        type: String,
        required: true,
    },
    chooseLogo: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('DigitalPaymentMethod', digitalPaymentMethodSchema);

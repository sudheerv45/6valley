const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
      trim: true, // Removes any leading/trailing spaces
      validate: {
        validator: function (value) {
          return /^[A-Za-z0-9_-]+$/.test(value); // Allows alphanumeric characters, underscores, and dashes
        },
        message: 'Order ID must contain only alphanumeric characters, underscores, or dashes.',
      },
    },
    orderDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer', // Reference to the Customer table
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[A-Za-z0-9\s]+$/.test(value); // Only allows alphanumeric and spaces
        },
        message: 'Store name must contain only letters, numbers, and spaces.',
      },
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Reference to the Product table
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: [1, 'Quantity must be at least 1.'], // Minimum quantity validation
        },
        price: {
          type: Number,
          required: true,
          min: [0, 'Price must be a positive number.'], // Ensure price is non-negative
        },
      },
    ],
    totalItems: {
      type: Number,
      required: true,
      min: [1, 'Total items must be at least 1.'], // At least one item in the order
    },
    itemPrice: {
      type: Number,
      required: true,
      min: [0, 'Item price must be a positive number.'],
    },
    itemsDiscount: {
      type: Number,
      default: 0,
      min: [0, 'Items discount cannot be negative.'],
    },
    couponDiscount: {
      type: Number,
      default: 0,
      min: [0, 'Coupon discount cannot be negative.'],
    },
    extraDiscount: {
      type: Number,
      default: 0,
      min: [0, 'Extra discount cannot be negative.'],
    },
    discountedAmount: {
      type: Number,
      required: true,
      min: [0, 'Discounted amount must be a positive number.'],
    },
    vatTax: {
      type: Number,
      required: true,
      min: [0, 'VAT tax must be a positive number.'],
    },
    shipping: {
      type: Number,
      required: true,
      min: [0, 'Shipping must be a positive number.'],
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount must be a positive number.'],
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid'],
      required: true,
      default: 'unpaid',
    },
    orderStatus: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'packaging',
        'out for delivery',
        'delivered',
        'returned',
        'failed to deliver',
        'cancelled',
      ],
      required: true,
      default: 'pending',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Order', orderSchema);

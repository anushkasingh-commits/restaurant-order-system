const mongoose = require("mongoose")

const orderItemSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type:Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message : "Quantity should be whole number"
        }
    }
}, {_id:false})

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required: true
    },
    items: {
        type: [orderItemSchema],
        validate: {
            validator: (items) => items.length > 0,
            message : "An order must contain atleast one item"
        }
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    gst: {
        type: Number,
        required: true,
        min: 0,
    },
    grandTotal: {
        type:Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: {
            values : ["placed", "preparing", "served", "paid", "cancelled"],
        },
        default: "placed"
    }
}, {timestamps:true})

module.exports = mongoose.model("Order", orderSchema)
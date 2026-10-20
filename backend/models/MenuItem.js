const mongoose = require("mongoose")

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true
    },
    category: {
        type:String,
        required: true,
        enum: {
            values: ["starters", "main-course", "desserts", "beverages"],
            message: "Category must be starters, main-course, desserts or beverages",
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    foodType: {
        type: String,
        enum: {
            values: ["veg", "non-veg"],
            message: "Food type must be veg or non-veg"
        }
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String,
        trim: true,
        default: ""
    }
}, {timestamps: true})

module.exports = mongoose.model("MenuItem", menuItemSchema)
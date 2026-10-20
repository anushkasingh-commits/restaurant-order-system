const mongoose = require("mongoose")

const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: "Table number must be whole number"
        },
    },
    capacity: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: "Capacity must be a whole number"
        }
    }
}, {timestamps: true})

module.exports = mongoose.model("Table", tableSchema)
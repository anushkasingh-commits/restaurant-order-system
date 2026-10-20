const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        unique: true,
        minlength: [6, "Password must be atleast 6 characters"]
    },
    role: {
        type: String,
        enum: {
            values: ["customer", "admin"],
            message: "Role must be customer or admin",
        },
        default: "customer"
    }
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.comparePassword = function(userPassword) {
    return bcrypt.compare(userPassword, this.password);
}

module.exports = mongoose.model("User", userSchema)
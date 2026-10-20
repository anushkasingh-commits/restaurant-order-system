require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const MenuItem = require("../models/MenuItem");
const Table = require("../models/Table");

const menuItems = [
    { name: "Paneer Tikka", category: "starters", price: 250, foodType: "veg" },
    { name: "Chicken Wings", category: "starters", price: 320, foodType: "non-veg" },
    { name: "Veg Spring Rolls", category: "starters", price: 180, foodType: "veg" },
    { name: "Butter Chicken", category: "main-course", price: 380, foodType: "non-veg" },
    { name: "Dal Makhani", category: "main-course", price: 260, foodType: "veg" },
    { name: "Paneer Butter Masala", category: "main-course", price: 300, foodType: "veg" },
    { name: "Veg Biryani", category: "main-course", price: 280, foodType: "veg" },
    { name: "Chicken Biryani", category: "main-course", price: 340, foodType: "non-veg" },
    { name: "Gulab Jamun", category: "desserts", price: 120, foodType: "veg" },
    { name: "Chocolate Brownie", category: "desserts", price: 160, foodType: "veg" },
    { name: "Mango Lassi", category: "beverages", price: 110, foodType: "veg" },
    { name: "Masala Chai", category: "beverages", price: 60, foodType: "veg" },
];
const tables = [
    { tableNumber: 1, capacity: 2 },
    { tableNumber: 2, capacity: 4 },
    { tableNumber: 3, capacity: 4 },
    { tableNumber: 4, capacity: 6 },
    { tableNumber: 5, capacity: 8 },
];
const demoUsers = [
    { name: "Admin Demo", email: "admin@example.com", password: "admin123", role: "admin" },
    { name: "Customer Demo", email: "customer@example.com", password: "customer123", role: "customer" },
];
const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await MenuItem.deleteMany({});
        await Table.deleteMany({});
        await MenuItem.insertMany(menuItems);
        console.log(`Added ${menuItems.length} menu items`);
        await Table.insertMany(tables);
        console.log(`Added ${tables.length} tables`);
        for (const demo of demoUsers) {
            const existing = await User.findOne({ email: demo.email });
            if (!existing) {
                await User.create(demo);
                console.log(`Created user ${demo.email}`);
            } else {
                console.log(`User ${demo.email} already exists, skipped`);
            }
        }
        console.log("Seeding finished");
    } catch (error) {
        console.error("Seeding failed:", error.message);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}
seed();
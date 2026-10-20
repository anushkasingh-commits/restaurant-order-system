const MenuItem= require('../models/MenuItem')

const getMenuItems = async(req, res, next) => {
    try {
        const filter = { isAvailable: true};
        if (req.query.category) {
            filter.category = req.query.category
        }
        if (req.query.foodType) {
            filter.foodType = req.query.foodType
        }
        if (req.query.search) {
            filter.name = { $regex: req.query.search, $options: "i"};
        }
        const items = await MenuItem.find(filter).sort({ name: 1});
        res.status(200).json(items);
    } catch(error) {
        next(error)
    }
}

const getAllMenuItems = async(req, res, next) => {
    try {
        const items = await MenuItem.find().sort({name:1})
        res.status(200).json(items)
    } catch(error){
        next(error)
    }
}

const getMenuItemById = async (req, res, next) => {
    try {
        const item = await MenuItem.findById(req.params.id)
        if (!item) {
            const error = new Error("Item not found")
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(item)
    } catch(error) {
        next(error)
    }
}

const createMenuItem =async(req, res, next) => {
    try{
        const item = await MenuItem.create(req.body)
        res.status(201).json(item);
    } catch(error) {
        next(error)
    } 
}

const updateMenuItem = async(req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body,  {
            new: true,
            runValidators: true
        })
        if (!item) {
            const error = new Error("Item not found")
            error.statusCode = 404
            throw error
        }
        res.status(200).json(item) 
    } catch(error) {
        next(error)
    }
}
const deleteMenuItem = async(req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id)
        if (!item) {
            const error = new Error("Item not found")
            error.statusCode = 404
            throw error
        }
        res.status(200).json({message: "Item deleted"}) 
    } catch(error) {
        next(error)
    }
}
module.exports = {
    getMenuItems, getAllMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem
}
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const Table = require("../models/Table");
const GST_RATE = 0.05;

const allowedNextStatus = {
    placed: ["preparing", "cancelled"],
    preparing: ["served"],
    served: ["paid"],
    paid: [],
    cancelled: [],
};
const createOrder = async (req, res, next) => {
    try {
        const { tableId, items } = req.body;
        if (!tableId || !items || items.length === 0) {
            const error = new Error("A table and at least one item are required");
            error.statusCode = 400;
            throw error;
        }
        const table = await Table.findById(tableId);
        if (!table) {
            const error = new Error("Table not found");
            error.statusCode = 404;
            throw error;
        }
        const orderItems = [];
        let subtotal = 0;
        for (const line of items) {
            if (!line.quantity || line.quantity < 1) {
                const error = new Error("Quantity must be at least 1");
                error.statusCode = 400;
                throw error;
            }
            const menuItem = await MenuItem.findById(line.menuItemId);
            if (!menuItem) {
                const error = new Error("Menu item not found");
                error.statusCode = 404;
                throw error;
            }
            if (!menuItem.isAvailable) {
                const error = new Error(`${menuItem.name} is not available`);
                error.statusCode = 400;
                throw error;
            }
            orderItems.push({
                menuItem: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: line.quantity,
            });
            subtotal = subtotal + menuItem.price * line.quantity;
        }
        subtotal = Math.round(subtotal * 100) / 100;
        const gst = Math.round(subtotal * GST_RATE * 100) / 100;
        const grandTotal = Math.round((subtotal + gst) * 100) / 100;
        const order = await Order.create({
            customer: req.user._id,
            table: table._id,
            items: orderItems,
            subtotal: subtotal,
            gst: gst,
            grandTotal: grandTotal,
        });
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
}
const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ customer: req.user._id })
            .sort({ createdAt: -1 })
            .populate("table", "tableNumber");
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
}
const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("table", "tableNumber");
        if (!order) {
            const error = new Error("Order not found");
            error.statusCode = 404;
            throw error;
        }
        const isOwner = order.customer.toString() === req.user._id.toString();
        const isAdmin = req.user.role === "admin";
        if (!isOwner && !isAdmin) {
            const error = new Error("You cannot view this order");
            error.statusCode = 403;
            throw error;
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}
const cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            const error = new Error("Order not found");
            error.statusCode = 404;
            throw error;
        }
        if (order.customer.toString() !== req.user._id.toString()) {
            const error = new Error("You cannot cancel this order");
            error.statusCode = 403;
            throw error;
        }
        if (order.status !== "placed") {
            const error = new Error("Only placed orders can be cancelled");
            error.statusCode = 400;
            throw error;
        }
        order.status = "cancelled";
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}
const getAllOrders = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.status) {
            filter.status = req.query.status;
        }
        const orders = await Order.find(filter)
            .sort({ createdAt: -1 })
            .populate("table", "tableNumber");

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
}
const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) {
            const error = new Error("Order not found");
            error.statusCode = 404;
            throw error;
        }
        const options = allowedNextStatus[order.status];
        if (!options.includes(status)) {
            const error = new Error(`Cannot change status from ${order.status} to ${status}`);
            error.statusCode = 400;
            throw error;
        }
        order.status = status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    createOrder, getMyOrders, getOrderById, cancelOrder, getAllOrders, updateOrderStatus,
};
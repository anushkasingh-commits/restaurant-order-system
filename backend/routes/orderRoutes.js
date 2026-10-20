const express = require("express");
const {createOrder, getMyOrders, getOrderById, cancelOrder, getAllOrders, updateOrderStatus} = require("../controllers/orderController");
const { authHandler, allowRoles } = require("../middleware/authHandler");

const router = express.Router();

router.post("/", authHandler, allowRoles("customer"), createOrder);
router.get("/mine", authHandler, allowRoles("customer"), getMyOrders);
router.get("/", authHandler, allowRoles("admin"), getAllOrders);
router.get("/:id", authHandler, getOrderById);
router.patch("/:id/cancel", authHandler, allowRoles("customer"), cancelOrder);
router.patch("/:id/status", authHandler, allowRoles("admin"), updateOrderStatus);

module.exports = router;
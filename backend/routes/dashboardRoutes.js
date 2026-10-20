const express = require("express");
const { getDashboard } = require("../controllers/dashboardController");
const { authHandler, allowRoles } = require("../middleware/authHandler");
const router = express.Router();
router.get("/", authHandler, allowRoles("admin"), getDashboard);

module.exports = router;
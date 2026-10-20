const express = require("express");
const {
  getTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
} = require("../controllers/tableController");
const { authHandler, allowRoles } = require("../middleware/authHandler");

const router = express.Router();
router.get("/", authHandler, getTables);
router.get("/:id", authHandler, getTableById);

router.post("/", authHandler, allowRoles("admin"), createTable);
router.put("/:id", authHandler, allowRoles("admin"), updateTable);
router.delete("/:id", authHandler, allowRoles("admin"), deleteTable);

module.exports = router;
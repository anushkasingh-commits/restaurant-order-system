const express = require("express")
const {
    getMenuItems,
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require('../controllers/menuController')
const { authHandler, allowRoles }=  require('../middleware/authHandler')
const router = express.Router()
router.get('/', getMenuItems)
router.get('/all', authHandler, allowRoles('admin'), getAllMenuItems)
router.get('/:id', getMenuItemById)
router.post('/', authHandler, allowRoles('admin'), createMenuItem)
router.put('/:id', authHandler, allowRoles('admin'), updateMenuItem)
router.delete('/:id', authHandler, allowRoles('admin'), deleteMenuItem)

module.exports = router
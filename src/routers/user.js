const express = require("express")
const {
  createUser,
  login,
  getUsers
} = require('../controllers/user')
const { verifyToken, verifyAdminRole } = require("../middleware/auth")


const router = express.Router()

router.get("/", verifyToken, verifyAdminRole, getUsers)
router.post("/", createUser)
router.post("/login", login)

module.exports = router

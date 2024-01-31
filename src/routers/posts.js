const express = require("express")
const {
  getPosts
} = require('../controllers/post')
const { verifyToken } = require("../middleware/auth")


const router = express.Router()

router.get("/", verifyToken, getPosts)

module.exports = router

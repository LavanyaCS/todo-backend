const express = require("express");
const { registerUser, loginUser, getAllUserList } = require("../controllers/authController");
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",getAllUserList);


module.exports = router;
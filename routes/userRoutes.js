const express = require("express")
 
const router = express.Router()

const {registerUser, LoginUser, Cur_info} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register",registerUser);

router.post("/login",LoginUser);

router.get("/current", validateToken, Cur_info );

module.exports = router
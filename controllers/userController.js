const asyncHandler = require('express-async-handler');
const User = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Access_token_secret = '123456'
const registerUser = asyncHandler(async (req,res) => {
    const {username, email, password} = req.body

    if(!username || !email || !password){
        res.status(400);
        throw new Error("All field mandatory");
    }

    const userAvailabe =  await User.findOne({email});
    if(userAvailabe){
        res.status(400);
        throw new Error("User already Registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password is ",hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })

    console.log(`User Created ${user}`)

    if(user){
        res.status(201).json({ _id: user.id, email: user.email})
    }
    else{
        res.status(400)
        throw new Error("User data is not valid");
    }
    res.json({message : "Register the user"})
});

const LoginUser = asyncHandler(async (req,res) => {
    const {email, password} =  req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email});
    const check = await bcrypt.compare(password, user.password)
    if(user && check) {

        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
         },
         Access_token_secret,
         {expiresIn: '15m'}
         );
         
        res.status(200).json({accessToken})
        
    }
    else{
        res.status(401)
        throw new Error("email not found")
    }
});

const Cur_info = asyncHandler(async (req, res) => {
    res.json({message : "Current user information"})
});

module.exports = {registerUser, LoginUser, Cur_info }
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const Access_token_secret = '123456'

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.header.Authorization

    if(authHeader && authHeader.startsWith("Bearer")) {

        token = authHeader.split(" ")[1];
        jwt.verify(token, Access_token_secret, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error(" User is not authorized")
            }

            console.log(decoded);
            req.user = decoded.user
            next()
        })
        if(!token){
            res.status(401)
            throw new Error(" User not authorized") 
        }

    }

})

module.exports = validateToken
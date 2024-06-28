const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];  // Corrected the split method
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
                //return res.json({ message: "User is not authorized" });
            }
            console.log(decoded);
            req.user = decoded.user;  // Assuming you want to attach the decoded user to the request
            console.log("Decoded user:", decoded.user); // Debugging log
            next();  // Move to the next middleware
        });
    } else {
        res.status(401);
        return res.json({ message: "Token not provided" });
    }
});

module.exports = validateToken;




// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");

// const validateToken = asyncHandler(async(req,res,next) =>{
//     let token;
//     let authHeader = req.headers.Authorization || req.headers.authorization;
//     if (authHeader && authHeader.startsWith("Bearer ")){
//         token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
//             if (err) {
//                 res.status(401);
//                 throw new Error("user is not authorized");
//             }
//             console.log(decoded);
//             req.user = decoded.user;
//             next();               
//         });

//         if(!token) {
//             res.status(401);
//             throw new Error("user is not authorized or token is missing");
//         }
//     }
// });

// module.exports = validateToken;



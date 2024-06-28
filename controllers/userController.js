const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
// @desc Register User
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req,res) =>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }
    //hash pasword
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed Password:", hashedPassword);
    const user = await User.create({
        username,
        email,
        password : hashedPassword,
    });
    console.log(`user creted ${user}`);
    if(user){
        res.status(201).json({ _id: user.id, email: user.email });
    } else{
        res.status(404);
        throw new Error("User data was not valid");
    } 
    res.json({message: "register user"});
});

// @desc Register User
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req,res) =>{
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const loginUser = await User.findOne({email});
    //compare passord with hashedpassword
    if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
        const accessToken = jwt.sign({
            user: {
                username: loginUser.username,
                email: loginUser.email,
                id: loginUser.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new Error("email or password is not vlid")
    }
    res.json({message: "login user"});
});

// @desc Register User
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req,res) =>{
    res.json(req.user);
    //res.json({message: "current  user data"});
});
module.exports = {registerUser, loginUser, currentUser};

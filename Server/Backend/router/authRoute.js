const express=require("express");
const { signUp, login, getUserDetails}=require("../controller/authController")
const { signupValidator }=require('../middleware/signupValidator')
const { authUser }=require('../middleware/authenticateUser')
const { loginValidator }=require('../middleware/loginValidator')

const userRoute=express.Router()

userRoute.post("/signup",signupValidator,signUp)
userRoute.post("/login",loginValidator,login)
userRoute.post("/",authUser,getUserDetails)

module.exports=authRoute;
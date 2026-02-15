const express = require("express")
const authRouter = express.Router()
const { registercontroller, getmecontroller,logincontroller } = require("../controller/auth.controller")

authRouter.post("/register", registercontroller)

authRouter.get("/get-me", getmecontroller)

authRouter.post("/login",logincontroller)

module.exports = authRouter
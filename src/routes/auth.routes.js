const express = require("express")

const authRouter = express.Router()

authRouter.post("/register")

authRouter.post("/login")

module.exports = authRouter
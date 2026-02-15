const userModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registercontroller(req, res) {
    const { username, email, password } = req.body

    const ifUserAlreadyExits = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    if (ifUserAlreadyExits) {
        return res.status(409).json({
            Message: ifUserAlreadyExits.email === email
                ? "Email already exists"
                : "username already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
    )

    res.cookie("token", token)

    res.status(201).json({
        Message: "User registered successfully",
        user: {
            username: user.username,
            email: user.email
        }
    })
}


async function getmecontroller(req, res) {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id)
    res.json({
        username: user.username,
        email: user.email
    })
}

async function logincontroller(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            Message: "User not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            Message: "password is invalid"
        })
    }
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
    )

    res.cookie("token", token)

    res.json({
        Message: "Login successful"
    })


}

module.exports = { registercontroller, getmecontroller, logincontroller }

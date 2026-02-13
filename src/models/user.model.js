const mongosse = require("mongoose")

const userSchema = new mongosse.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"Email alreaday exits"]
    },
    password:String
})

const userModel = mongosse.model("users",userSchema)

module.exports = userModel
const mongosse = require("mongoose")

function connectToDb() {
    mongosse.connect(process.env.MONGO_URI)
        .then((res) => {
            console.log("connected to DB")
        })
}

module.exports = connectToDb
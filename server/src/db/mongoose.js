const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config();

const conn = mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},
    () => console.log("connected to db"))


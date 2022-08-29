const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    picture: String,
    id: Number
});

const People = mongoose.model("people", personSchema);

module.exports = People;
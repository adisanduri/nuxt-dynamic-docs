const mongo = require('mongoose');
const Schema = mongo.Schema;

const userSchema = new Schema({

    _id: Number,
    name: String,
    identify: String,
    image: String,
})

module.exports = mongo.model('user', userSchema);
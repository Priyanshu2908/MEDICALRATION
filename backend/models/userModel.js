const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, require: true },
    confirmPassword: { type: String, require: true },

});

module.exports = model('user', mySchema);

// title : String
// price : Number
// description : String
// category : String
// image : String
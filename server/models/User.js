const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
});

// for case-insensitive logging in
userSchema.statics.findOneByUsername = function (username) {
    return this.findOne({ username: new RegExp(username, 'i') })
  }  

module.exports = mongoose.model("User", userSchema);
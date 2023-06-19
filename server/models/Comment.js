const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let  commentSchema = new Schema ({
    ownerID: {type: String, required: true},
    owner: {type: String},
    text: {type: String, required: true},
    date: {type: Date, default: Date.now(), required: true}
  })

module.exports = mongoose.model("Comment", commentSchema);

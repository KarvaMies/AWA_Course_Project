const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  title: {type: String, required: true},
  text: {type: String, required: true},
  date: {type: Date, default: Date.now, required: true},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model("Thread", threadSchema);

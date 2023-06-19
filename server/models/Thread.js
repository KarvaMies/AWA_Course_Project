const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let  threadSchema = new Schema ({
  ownerID: {type: String, required: true},
  owner: {type: String},
  title: {type: String, required: true},
  text: {type: String, required: true},
  date: {type: Date, default: Date.now(), required: true},
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
})

module.exports = mongoose.model("Thread", threadSchema);



/*
todo: tee testi thread, lisää kommentti (implementoi kommentin tekeminen oikein tohon tiedostoon -> (thread.js))
ja tsekkaa et toimii oikein
*/
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


/*
Update your routes/api.js file to use the MongoDB driver instead of the hardcoded data.
Here's an example of how to retrieve all data from the MongoDB database:

router.get('/data', (req, res, next) => {
  const db = req.app.locals.db;

  db.collection('data').find({}).toArray((err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});
This code retrieves all documents from the data collection in the MongoDB database and 
sends them as a JSON response.

That's it! You should now have MongoDB integrated into your project.
Note that you'll need to create the users and data collections in your MongoDB database
before you can use them. You can do this using the MongoDB shell or a tool like Compass.

*/
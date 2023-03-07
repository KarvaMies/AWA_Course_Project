var express = require('express');
var router = express.Router();

// testing data
const data = [
    {"_id": 1, "owner": "admin", "title": "title1", "text": "foo", "date": new Date("2023-01-12T16:39:00Z"), "refers": ""},
    {"_id": 2, "owner": "admin", "title": "title2", "text": "bar", "date": new Date("2023-01-11T10:30:00Z"), "refers": ""},
    {"_id": 3, "owner": "admin", "title": "title3", "text": "123", "date": new Date("2023-02-03T18:45:00Z"), "refers": ""},
    {"_id": 4, "owner": "admin", "title": "Hello World!", "text": "console.log(\"Hello world!\");", "date": new Date("2023-02-05T12:15:00Z"), "refers": ""},
    {"_id": 5, "owner": "admin", "title": "For loop", "text": "for (let i = 0; i < 5; i++) {console.log(\"Hi!\");}", "date": new Date("2023-03-01T21:00:00Z"), "refers": ""},
    {"_id": 6, "owner": "admin", "title": "title4", "text": "wasd", "date": Date.now(), "refers": ""},
]


router.get('/threads', (req, res, next) => {
  console.log(data)
  res.json(data);
});

router.get('/thread/:id', function(req, res, next) {
  res.json(data.find(data => data._id == req.params.id));
});


module.exports = router;

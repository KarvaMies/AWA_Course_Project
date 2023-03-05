var express = require('express');
var router = express.Router();


const data = [
    {"id": 1, "name": "admin", "comment": "foo", "date": new Date("2023-01-12T16:39:00Z"), "refers": "-"},
    {"id": 2, "name": "admin", "comment": "bar", "date": new Date("2023-01-11T10:30:00Z"), "refers": "-"},
    {"id": 3, "name": "admin", "comment": "123", "date": new Date("2023-02-03T18:45:00Z"), "refers": "-"},
    {"id": 4, "name": "admin", "comment": "console.log(\"Hello world!\");", "date": new Date("2023-02-05T12:15:00Z"), "refers": "-"},
    {"id": 5, "name": "admin", "comment": "for (let i = 0; i < 5; i++) {console.log(\"Hi!\");}", "date": new Date("2023-03-01T21:00:00Z"), "refers": "-"},
    {"id": 6, "name": "admin", "comment": "wasd", "date": Date.now(), "refers": "-"},
]


router.get('/data', (req, res, next) => {
  console.log(data)
  res.json(data);
});

router.get('/data/:id', function(req, res, next) {
  res.json(data.find(data => data.id == req.params.id));
});

module.exports = router;

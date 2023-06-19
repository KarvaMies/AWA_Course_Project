const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');
const Comment = require('../models/Comment');

router.post('/new', (req, res, next) => {
  console.log(req.body);
  
  Thread.create(
    {
      ownerID: req.body.ownerID,
      owner: req.body.owner,
      title: req.body.title,
      text: req.body.text,
      date: Date.now()
    },
    (err, ok) => {
      if (err) throw err;
      return res.redirect("/")
    }
  )
});

router.get('/get', (req, res, next) => {
  Thread.find({}, (err, threads) => {
    if (err) return next(err);
    console.log(threads);
    res.json(threads);
  })
});

router.get('/delete', (req, res, next) => {
  Thread.deleteMany({}, (err) => {
    if (err) return next(err);
    console.log('All threads deleted');
    res.json({ message: 'All threads have been deleted' });
  })
})

router.get('/:id/comment', (req, res) => {
  res.json({ success: "ok"})
})

router.post('/:id/comment', async (req, res) => {
  console.log(req.body);

  const newComment = new Comment({
      ownerID: req.body.ownerID,
      owner: req.body.owner,
      text: req.body.text,
      date: Date.now()
    });

  newComment.save()
    .then(comment => {
      Thread.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: comment._id } },
        { new: true }
      )
        .populate('comments')
        .exec((err, updatedThread) => {
          if (err) throw err;
          res.status(200).json(updatedThread);
        });
    })
  


  try {
    const thread = await Thread.findById(req.params.id);
    const comment = new Comment({
      owner: req.body.owner,
      text: req.body.text
    });
    await comment.save();
    thread.comments.push(comment);
    await thread.save();
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', (req, res) => {
  Thread.findById(req.params.id)
    .populate('comments')
    .exec((err, thread) => {
      if (err) {
        console.error('Error retrieving thread:', err);
        return res.status(500).json({ error: 'Failed to retrieve thread' });
      }
      if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
      }
      res.json({thread});
    });
});

module.exports = router;


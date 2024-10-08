
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Swayam:9832900366@cluster0.z7kyt.mongodb.net/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);


app.post('/posts', async (req, res) => {
  const { title, content, email } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  // Use the user's _id directly
  const newPost = new Post({ title, content, user: user._id });

  // Save the post to the database
  await newPost.save();

  res.status(201).send(newPost);
});

app.post('/posts', async (req, res) => {
  const { title, content, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  const newPost = new Post({ title, content, user: user._id });

  await newPost.save();

  res.status(201).send(newPost);
});


app.get('/posts', async (req, res) => {
  const posts = await Post.find().populate('user');
  res.json(posts);
});
app.get('/', async (req, res) => {
 res.send("Hello World")
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

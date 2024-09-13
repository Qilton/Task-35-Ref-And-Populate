
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const websites = [
  "localhost:8080",
  "https://task-35-ref-and-populate-chi.vercel.app/",
  "https://task-35-ref-and-populate.vercel.app/",
  ];
app.use(
  cors({
  origin: websites,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
  })
  );
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


app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  await newUser.save();
  console.log(newUser)
  res.status(201).send(newUser);
});

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

// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://task-35-ref-and-populate.vercel.app/users', { name, email });
    setName('');
    setEmail('');
    console.log(Response.data)
    alert("Registered Successfully")
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://task-35-ref-and-populate.vercel.app/posts', { title, content, userId });
    setTitle('');
    setContent('');
    setUserId('');
    // console.log(response.data)
    alert("Post Added Succesfully")
  };

  const fetchPosts = async () => {
    const response = await axios.get('https://task-35-ref-and-populate.vercel.app/posts');
    console.log(response.data)
    setPosts(response.data);
  };

  return (
    <div>
      <h1>User and Post Management</h1>

      <form onSubmit={handleUserSubmit}>
        <h2>Add User</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Add User</button>
      </form>

      <form onSubmit={handlePostSubmit}>
        <h2>Add Post</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
        />
        <button type="submit">Add Post</button>
      </form>

      <button onClick={fetchPosts}>Fetch Posts</button>

      <div>
        <h2>Posts:</h2>
        <ul>
          {posts.map((post) => (
             <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>User:{post.user.name} ({post.user.email})</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

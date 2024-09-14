import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://task-35-ref-and-populate.vercel.app/users', { name, email });
      setName('');
      setEmail('');
      console.log(response.data);
      alert("Registered Successfully");
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://task-35-ref-and-populate.vercel.app/posts', { title, content, email });
      setTitle('');
      setContent('');
      setEmail(''); 
      console.log(response.data);
      alert("Post Added Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error adding post", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://task-35-ref-and-populate.vercel.app/posts');
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="User Email"
        />
        <button type="submit">Add Post</button>
      </form>

      <div>
        <h2>Posts:</h2>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>User: {post.user.name} ({post.user.email})</p>
            </li>
          ))}
        </ul>
      </div>
      <h1>SORRY FROM GANJI CHUDAIL <img src="./public/Img.png" alt="" /></h1>
    </div>
  );
}

export default App;

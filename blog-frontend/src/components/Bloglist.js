import React, { useState } from 'react';

const Bloglist = (props) => {
  const [blogs, setBlogs] = useState([]);
  
  return (
    <div>
      <h1>Blogs</h1>
      <p>{`${props.user.username} logged in`}</p>
    </div>
  );
}

export default Bloglist;
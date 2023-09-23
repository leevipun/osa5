import { useState } from "react";
import noteServices from "../services/blogs";

const Note = ({ note, blogs, setBlogs }) => {
  const [showAll, setShowAll] = useState(false);
  const [buttonName, setButtonName] = useState("View");

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  };

  const handleLikeing = async (event) => {
    const updatedBlog = {
      title: note.title,
      author: note.author,
      url: note.url,
      likes: note.likes + 1,
    };

    // Optimistically update the UI
    setBlogs(
      blogs.map((blog) =>
        blog.id === note.id ? { ...blog, likes: updatedBlog.likes } : blog
      )
    );

    // Send the network request
    try {
      const response = await noteServices.update(note.id, updatedBlog);
    } catch (error) {
      console.log(error);
      setBlogs(
        blogs.map((blog) =>
          blog.id === note.id ? { ...blog, likes: note.likes } : blog
        )
      );
    }
  };

  const handleView = () => {
    if (buttonName === "View") {
      setShowAll(true);
      setButtonName("Hide");
    } else {
      setShowAll(false);
      setButtonName("View");
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        <p>{`${note.title} By: ${note.author}`}</p>
        <button onClick={() => handleView()}>{buttonName}</button>
      </div>
      {showAll && (
        <div>
          <p>{`URL: ${note.url}`}</p>
          <p>{`Likes: ${note.likes}`}</p>
          <p>{`User: ${note.user.username}`}</p>
          <div>
            <button onClick={() => handleLikeing(note.id)}>Like</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;

import { useState } from "react";
import noteServices from "../services/blogs";

const NoteForm = ({ setNewBlogForm, setBlogs, setNotification, blogs }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");

  const handleCreationCancel = () => {
    setNewBlogForm(false);
    setNewBlogAuthor("");
    setNewBlogTitle("");
    setNewBlogUrl("");
  };

  const addNote = (event) => {
    event.preventDefault();
    const blogObeject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0,
    };

    noteServices.create(blogObeject).then((returnedNote) => {
      setBlogs(blogs.concat(returnedNote));
      setNotification(`${newBlogTitle} By: ${newBlogAuthor} is added`);
      setNewBlogForm(false);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      setNewBlogTitle("");
      setNewBlogUrl("");
      setNewBlogAuthor("");
    });
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <div>
          <label id="titleInput">Title:</label>
          <input
            value={newBlogTitle}
            onChange={(e) => setNewBlogTitle(e.target.value)}
            aria-label="'titleInput"
            placeholder="Title"
          />
        </div>
        <div>
          <label id="urlInput">URL:</label>
          <input
            value={newBlogUrl}
            onChange={(e) => setNewBlogUrl(e.target.value)}
            aria-label="urlInput"
            placeholder="URL"
          />
        </div>
        <div>
          <label id="authorInput">Author:</label>
          <input
            value={newBlogAuthor}
            onChange={(e) => setNewBlogAuthor(e.target.value)}
            aria-label="authorInput"
            placeholder="Author"
          />
        </div>
        <button type="submit">save</button>
      </form>
      <div>
        <button onClick={() => handleCreationCancel()}>Cancel</button>
      </div>
    </div>
  );
};

export default NoteForm;

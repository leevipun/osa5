import { useState } from "react";
import noteServices from "../services/blogs";
import { useDispatch } from "react-redux";
import {
  addingNotification,
  clearNotification,
  voteNotification,
} from "../reducers/NotificationReducer";
import { createBlog } from "../reducers/BlogReducer";

const NoteForm = ({ setNewBlogForm }) => {
  const dispatch = useDispatch();
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

    dispatch(createBlog(blogObeject));

    dispatch(
      addingNotification(`${newBlogTitle} By: ${newBlogAuthor} is added`)
    );
    setNewBlogForm(false);
    setNewBlogTitle("");
    setNewBlogUrl("");
    setNewBlogAuthor("");
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
            id="title"
          />
        </div>
        <div>
          <label id="urlInput">URL:</label>
          <input
            value={newBlogUrl}
            onChange={(e) => setNewBlogUrl(e.target.value)}
            aria-label="urlInput"
            placeholder="URL"
            id="url"
          />
        </div>
        <div>
          <label id="authorInput">Author:</label>
          <input
            value={newBlogAuthor}
            onChange={(e) => setNewBlogAuthor(e.target.value)}
            aria-label="authorInput"
            placeholder="Author"
            id="author"
          />
        </div>
        <button type="submit" id="Blog-save-button">
          save
        </button>
      </form>
      <div>
        <button onClick={() => handleCreationCancel()}>Cancel</button>
      </div>
    </div>
  );
};

export default NoteForm;

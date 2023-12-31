import { useEffect, useState } from "react";
import noteServices from "../services/blogs";
import { useDispatch } from "react-redux";
import { voteNotification } from "../reducers/NotificationReducer";

const Note = ({ note, blogs, setBlogs, user }) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [buttonName, setButtonName] = useState("View");
  const [acces, setAcces] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  };

  const handleLikeing = async () => {
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
      dispatch(
        voteNotification(`Blog ${note.title} by: ${note.author} was voted up!`)
      );
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

  const CanDelete = () => {
    console.log(note.user.id);
    console.log(user.id);
    if (note.user.id && user.id) {
      if (note.user.id === user.id) {
        setAcces(true);
        console.log(note.user.id);
        console.log(user.id);
      } else {
        setAcces(false);
      }
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `You are deleting ${note.name} By: ${note.author}. Are you sure you want to continue?`
      )
    ) {
      noteServices.deletion(note.id);
    } else {
      return;
    }
  };

  const handleView = () => {
    if (buttonName === "View") {
      CanDelete();
      setShowAll(true);
      setButtonName("Hide");
    } else {
      setShowAll(false);
      setButtonName("View");
    }
  };
  useEffect(() => {
    const sortItemsByLikes = () => {
      const sortedItems = [...blogs];
      sortedItems.sort((a, b) => {
        return b.likes - a.likes;
      });
      setBlogs(sortedItems);
    };

    sortItemsByLikes();
  }, []);

  return (
    <div style={blogStyle} className="note">
      <div>
        <p>{`${note.title} By: ${note.author}`}</p>
        <button onClick={() => handleView()} id="view-button">
          {buttonName}
        </button>
      </div>
      {showAll && (
        <div>
          <p>{`URL: ${note.url}`}</p>
          <p>{`Likes: ${note.likes}`}</p>
          <p>{`User: ${note.user.username}`}</p>
          <div>
            <button onClick={() => handleLikeing(note.id)} id="like-button">
              Like
            </button>
          </div>
          <div>
            {acces && (
              <button onClick={() => handleDelete(note.id)} id="delete-button">
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;

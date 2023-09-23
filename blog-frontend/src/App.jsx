import { useState, useEffect } from "react";
import Note from "./components/Note";
import ErrorNotification from "./components/errorNotification";
import Footer from "./components/Footer";
import noteService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(`${user.token}`);
    }
  }, []);

  useEffect(() => {
    if (user) {
      noteService.getAll().then((blogs) => {
        setBlogs(blogs);
        console.log(blogs);
      });
    }
  }, [user]);

  const addNote = (event) => {
    event.preventDefault();
    const blogObeject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0,
    };

    noteService.create(blogObeject).then((returnedNote) => {
      setBlogs(blogs.concat(returnedNote));
      setNotification(`${newBlogTitle} By: ${newBlogAuthor} is added`);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      setNewBlogTitle("");
      setNewBlogUrl("");
      setNewBlogAuthor("");
    });
  };

  const handleLogginOut = () => {
    setUser(null);
    window.localStorage.clear();
    console.log("loggin out...");
    setNotification("Succesfully logged out");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification(`Wellcome back ${username}!`);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setPassword("");
      setUsername("");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <div>
        <lable>Title: </lable>
        <input
          value={newBlogTitle}
          onChange={(e) => setNewBlogTitle(e.target.value)}
        />
      </div>
      <div>
        <label>URL: </label>
        <input
          value={newBlogUrl}
          onChange={(e) => setNewBlogUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Author: </label>
        <input
          value={newBlogAuthor}
          onChange={(e) => setNewBlogAuthor(e.target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification notification={notification} />
      <ErrorNotification errorMessage={errorMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>{" "}
          <button onClick={handleLogginOut}>Log out</button>
          {noteForm()}
          {blogs.map((blog) => (
            <Note note={blog} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;

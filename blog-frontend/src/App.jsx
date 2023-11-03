import { useState, useEffect } from "react";
import Note from "./components/Note";
import ErrorNotification from "./components/errorNotification";
import Footer from "./components/Footer";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import NoteForm from "./components/noteForm";
import { initializeBlogs } from "./reducers/BlogReducer";
import { useDispatch } from "react-redux";
import { voteNotification } from "./reducers/NotificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newBlogForm, setNewBlogForm] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log(user);
      blogService.setToken(`${user.token}`);
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
        console.log("blogeja", blogs);
      });
      blogService.getAll().then((blogs) => {
        dispatch(initializeBlogs(blogs)), console.log(blogs);
      });
    }
  }, [user]);

  const handleLogginOut = () => {
    setUser(null);
    window.localStorage.clear();
    console.log("loggin out...");
    dispatch(voteNotification("Succesfully logged out"));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("loggin in...");
      console.log(user.id);
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
          id="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
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
          <p>{user.name} logged in</p>
          <button onClick={handleLogginOut} id="logout-button">
            Log out
          </button>
          <div>
            <button onClick={() => setNewBlogForm(true)} id="newBlogButton">
              Add a new blog
            </button>
          </div>
          {newBlogForm && (
            <NoteForm
              setNewBlogForm={setNewBlogForm}
              setBlogs={setBlogs}
              setNotification={setNotification}
              blogs={blogs}
            />
          )}
          {blogs.map((blog) => (
            <Note note={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;

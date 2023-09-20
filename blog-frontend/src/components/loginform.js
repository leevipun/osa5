import React, { useState } from "react";
import axios from "axios";

const Loginform = ({setToken, setUser}) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handlesubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3003/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token, username, name } = response.data;
        console.log("Login successful!");
        console.log("Token:", token);
        console.log("Username:", username);
        console.log("Name:", name);
        setToken(token)
        setUser(username)
      } else {
        console.error("Login failed. Server returned an error.");
      }
    } catch (error) {
      console.error("Login failed. An error occurred:", error);
    }
  };

  return (
    <div>
      <h1>Log in to application</h1>
      <div>
        <label>Username: </label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => handlesubmit()}>Log in</button>
      </div>
    </div>
  );
};

export default Loginform;
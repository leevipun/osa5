import React, { useState } from "react";
import login from "../services/loginservice";

const Loginform = ({user, setUser}) => {

    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handlesubmit = async () => {
        const response = await loginaxios.login(username, password)
        const user = response.filter(!token)
    }

return (
    <div>
        <h1>
            Log in to application
        </h1>
        <div>
        <label>Username: </label>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
        <label>Password: </label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
            <button onClick={() => handlesubmit}>Log in</button>
        </div>
    </div>
);
}

export default Loginform;
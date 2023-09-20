import axios from 'axios';
const BaseURL = "https://localhost:3003"


const login = async (Käyttäjänimi, Salasana) => {
    try {
        const response = await axios.post(BaseURL + "/api/login", {
            username: Käyttäjänimi,
            password: Salasana
        });

        if (response.status === 200) {
            const { token, username, name } = response.data;
            console.log("Login successful!");
            console.log("Token:", token);
            console.log("Username:", username);
            console.log("Name:", name);
        } else {
            console.error("Login failed. Server returned an error.");
        }
    } catch (error) {
        console.error("Login failed. An error occurred:", error);
    }
};

export default login;
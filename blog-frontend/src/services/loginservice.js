import axios from 'axios';
const BaseURL = "https://localhost:3003"

const login = async (username, password) => {
    try {
      const response = await axios.post(BaseURL + "/api/login", {
        username: username,
        password: password
      });
      const {token, username, password} = response.body
    } catch (error) {
        console.error({Error: error})
    }
}

export default login
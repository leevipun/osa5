import logo from './logo.svg';
import './App.css';
import Loginform from './components/loginform';
import { useState } from 'react';
import Bloglist from './components/Bloglist';



function App() {
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')

  if (token === '') {
  return (
    <div className="App">
      <Loginform setToken={setToken} setUser={setUser}/>
    </div>
  );
} else if (token !== '') {
  <div>
    <Bloglist/>
  </div>
}
}

export default App;

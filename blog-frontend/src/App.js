import logo from './logo.svg';
import './App.css';
import Loginform from './components/loginform';
import { useState } from 'react';



function App() {
  const [user, setUser] = useState('')

  return (
    <div className="App">
      <Loginform user={user} setUser={setUser}/>
    </div>
  );
}

export default App;

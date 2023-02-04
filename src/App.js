import React, { useState, useEffect } from 'react';
import './assets/css/style.css';
import Routes from './Routes';
import authAPI from './API/authAPI';
import Cookies from 'universal-cookie';

export const UserContext = React.createContext()

function App() {
    const [auth, setAuth] = useState(undefined)
    const cookie = new Cookies()

  useEffect(()=>{
      const token = cookie.get('Auth')
      token && authAPI.getUser(token).then(response => setAuth(response.user))
  },[])

  return (
    <UserContext.Provider value={{auth, setAuth}}>  
        <div className='App'>
          {Routes(auth)}
        </div>
    </UserContext.Provider>
  );
}

export default App;

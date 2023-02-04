import React,{ useState, useEffect } from 'react';
import userAPI from './../../../API/userAPI';
import UserView from './pagesComponent/UserView';
import Navbar from '../Navbar/Navbar';

function Login() {

const [users, setUsers] = useState();

useEffect( () => {
    userAPI.getAll().then((e) => {
        setUsers(e)
    })
},[])

  return (
    <>
    <Navbar/>
    
    <div className="App p-3">
        <div className='container mx-auto flex flex-wrap justify-center content-center'>
          { users && users.map((data) => 
              <UserView
                  user = {data} 
              />
          )  
        }
        </div>
    </div>
    </>
  );
}

export default Login;

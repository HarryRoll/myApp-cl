import React,{useEffect,useContext, useState} from 'react'
import { UserContext } from '../../../App'
import { useNavigate } from 'react-router-dom'
import UserView from './pagesComponent/UserView'
import Loading from './pagesComponent/Loading'


function Users() {

  const {auth} = useContext(UserContext)
  const [wait, setWait] = useState(false)
  const navigate = new useNavigate()

  useEffect(() => {
    if(wait){
        if(auth){ 
            if(auth.roles !== 'admin'){
                navigate('/')  
              }
         }else{
            navigate('/')
        }
    }
    },[auth, wait])

    useEffect( () => {
      setTimeout(() => {
        setWait(true)
      }, 4000)
    },[])
    
  return (
    <div className='p-6'>
        {wait ?
           <UserView/>
          : 
          <>
            <Loading/>
          </>
        }
    </div>
  )
}

export default Users

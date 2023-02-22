import React,{useEffect,useContext, useState} from 'react'
import { UserContext } from '../../../App'
import { useNavigate } from 'react-router-dom'
import QuestionCreateForm from './pagesComponent/QuestionCreateForm'
import Loading from './pagesComponent/Loading'

function QuestionsCreate(state) {
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
    <div  className='p-6'>
      {wait ? 
        <QuestionCreateForm/>
        : 
        <>
        <Loading/>
        </>
        }
    </div>
  )
}

export default QuestionsCreate

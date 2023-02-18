import React,{useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../App'
import QuestionTestView from './pagesComponent/QuestionTestView'

function QuestionTest(state) {
    
  const navigate = new useNavigate()

  const {auth, setAuth} = useContext(UserContext)

  useEffect(() => {
      if(!auth){
          navigate('/')
          alert('please login first...!')      
      }
    },[auth])
  return (
    <div  className='p-6'>
      {auth ? 
        <QuestionTestView
            auth = {auth}
        />
      :<></>}
    </div>
  )
}

export default QuestionTest

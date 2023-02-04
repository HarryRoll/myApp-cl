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
      }
    },[auth])
  return (
    <div  className='p-6'>
        <QuestionTestView
            auth = {auth}
        />
    </div>
  )
}

export default QuestionTest

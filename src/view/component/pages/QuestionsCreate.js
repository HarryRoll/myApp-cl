import React,{useEffect,useContext, useState} from 'react'
import { UserContext } from '../../../App'
import { useNavigate } from 'react-router-dom'
import QuestionCreateForm from './pagesComponent/QuestionCreateForm'

function QuestionsCreate(state) {
  const {auth} = useContext(UserContext)
  const navigate = new useNavigate()

  useEffect(() => {
  setTimeout(() => {
    console.log(state)
    // if(auth){ 
    //   if(auth.roles !== 'admin'){
    //       navigate('/')  
    //     }
    // }else{
    //     navigate('/')
    //   }
  },5000)
    },[auth])
  return (
    <div  className='p-6'>
        <QuestionCreateForm/>
    </div>
  )
}

export default QuestionsCreate

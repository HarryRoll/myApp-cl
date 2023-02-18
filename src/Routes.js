import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Navbar from './view/component/Navbar/Navbar'
import Home from './view/component/pages/Home'
import Users from './view/component/pages/Users'
import QuestionsCreate from './view/component/pages/QuestionsCreate'
import QuestionTest from './view/component/pages/QuestionTest'

export default function Routes(isLogin) {

  return (
    useRoutes([
        {
            path : "/",
            element : <Navbar
                session = {isLogin}
            />,
            children : [
                {path : "", element : <Home
                  session = {isLogin}
                />},
                {path : "users", element : <Users/>},
                {path : "questions", element : <QuestionsCreate/>},
                {path : "test/:id", element : <QuestionTest/>}
            ]
        }
    ])
  )
}

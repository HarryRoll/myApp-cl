import React from 'react'
import ProfileScore from './pagesComponent/ProfileScore'
import QuestionView from './pagesComponent/QuestionView'

function Home(state) {
  return (
    <div className='p-6'>
      {
          state.session ? 
              <ProfileScore
                  state = {state}
              /> :
          <></>
      }
      <QuestionView/>
    </div>
  )
}

export default Home

import React,{useState, useEffect, useContext} from 'react'
import img from '../../../../assets/img/question-img.png'
import questApi from '../../../../API/questApi'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../../App'
import scoreAPI from '../../../../API/scoreAPI'

function QuestionView() {

    const [subject, setSubject] = useState()
    const {auth} = useContext(UserContext)
    const score = []


    useEffect(() => {
        questApi.GetSubject().then((e) => {
            setSubject(e)
            console.log('test2')
            scoreAPI.getScore(auth.id).then(s => {
                s && s.map(x => {
                    console.log(x.score !== '')
                if(x.score !== ''){score.push(x)}})
            })
        })
    },[auth])


    console.log(score)
  return (
    <div className='w-full min-h-screen bg-white rounded-lg mt-2 p-4'>
        {subject && subject.map(e => {
            return(
                <>           
                <Link to={`/test/${e.id}`}>
                    <div className='border-2 w-full mb-2 h-48 max-h-48 bg-white drop-shadow-lg rounded-md flex flex-row p-2 hover:bg-blue-100'>
                        <div className='h-full basis-1/5 text-ellipsis overflow-hidden'> 
                            <img src={img} alt='question-logo' className='w full'/>
                        </div>
                            <div className='basis-4/5 px-2 text-ellipsis overflow-hidden'>
                                <h1 className='text-xl font-semibold'>
                                    {e.subject_name}{score[0]}
                                </h1>
                                <p>
                                    {e.subject_Description}
                                </p>
                            </div>
                        </div>
                </Link>
                </>
                )
         })}
    </div>
  )
}

export default QuestionView

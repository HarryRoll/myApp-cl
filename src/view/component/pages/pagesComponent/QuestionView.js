import React,{useState, useEffect, useContext} from 'react'
import img from '../../../../assets/img/question-img.png'
import questApi from '../../../../API/questApi'
import scoreAPI from '../../../../API/scoreAPI'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../../App'

function QuestionView() {

    const [subject, setSubject] = useState()
    const [scoreExist, setScoreExist] = useState()
    const [userSubject, setUserSubject] = useState()
    const [spliceSub, setSpliceSub] = useState()
    const {auth} = useContext(UserContext)
    const arr = []
    
    const alertLog = () => {
        alert('please login first...!')
    } 
    
    useEffect(() => {
        questApi.GetSubject().then((e) => {
            setSubject(e.data.subject)
        })
        questApi.GetSubject().then((e) => {
            setSpliceSub(e.data.subject)
        })
    },[auth])

    useEffect(() => {
        scoreAPI.getScore(auth && auth.id).then(e =>setScoreExist(e))
    }, [auth,subject,spliceSub])

    useEffect(() => {
        spliceSub && spliceSub.map( (e, i) => {
            scoreExist && scoreExist.map( s => {             
                if(e.id === s.id_bs){
                    arr.push(i)
                }
            })
        })
        if(scoreExist && scoreExist.length === 0){
            setUserSubject(subject)
        }
        arr.reverse()
        if(auth){
        arr.map(i => {
            spliceSub.splice(i,1)
            setUserSubject(spliceSub)
        })}
    },[scoreExist])

    return (
    <div className='w-full min-h-screen bg-white rounded-lg mt-2 p-4'>
                <>
                {auth ? 
                <>
                {userSubject && userSubject.map(e => {
                    return(
                <Link to={`/test/${e.id}`} key={e.id}>
                    <div className='border-2 w-full mb-2 h-48 max-h-48 bg-white drop-shadow-lg rounded-md flex flex-row p-2 hover:bg-blue-100'>
                        <div className='h-full basis-1/5 text-ellipsis overflow-hidden'> 
                            <img src={img} alt='question-logo' className='w full'/>
                        </div>
                            <div className='basis-4/5 px-2 text-ellipsis overflow-hidden'>
                                <h1 className='text-xl font-semibold'>
                                    {e.subject_name}
                                </h1>
                                <p>
                                    {e.subject_Description}
                                </p>
                            </div>
                        </div>
                </Link>
                )})}
                </>
                :
                <>
                {subject && subject.map(e => {
                    return(
                <Link onClick={alertLog} key={e.id}>
                    <div className='border-2 w-full mb-2 h-48 max-h-48 bg-white drop-shadow-lg rounded-md flex flex-row p-2 hover:bg-blue-100'>
                        <div className='h-full basis-1/5 text-ellipsis overflow-hidden'> 
                            <img src={img} alt='question-logo' className='w full'/>
                        </div>
                            <div className='basis-4/5 px-2 text-ellipsis overflow-hidden'>
                                <h1 className='text-xl font-semibold'>
                                    {e.subject_name}
                                </h1>
                                <p>
                                    {e.subject_Description}
                                </p>
                            </div>
                        </div>
                </Link>
                )})}
                </>
                }            
                </>
    </div>
  )
}

export default QuestionView

import React,{useContext, useEffect, useState} from 'react'
import { UserContext } from '../../../../App'
import scoreAPI from '../../../../API/scoreAPI'

function ProfileScore() {
        const {auth} = useContext(UserContext)
        const [score, setScore] = useState()

    useEffect(() => {
        setTimeout(() => {
            scoreAPI.getScore(auth.id).then(e => setScore(e))
        },1200)
    }, [])
  return (
    <div className='rounded w-full shadow-lg bg-white drop-shadow p-4'>
        <table className='w-full'>
            <tbody className='p-2'>
                <tr>
                    <td className='align-text-top w-3/4'>
                        <h1 className='text-xl'>{auth.username}</h1>
                    </td>
                    <td className='w-1/5'>
                        <td className='align-text-top w-1/6'>
                            SCORE :
                        </td>
                        <td className='w-1/3'>
                            {score && score.map(e => {
                                return(
                                    <tr key={e.id}>
                                        <td className='w-5/6'>{e.subject_name} </td>
                                        <td className='w-1/6'>: {e.score}</td>
                                    </tr>                                  
                                )
                            })}
                        </td>
                    </td>        
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ProfileScore
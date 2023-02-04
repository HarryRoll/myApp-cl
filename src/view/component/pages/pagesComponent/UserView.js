import React,{useState, useEffect} from 'react'
import userAPI from '../../../../API/userAPI'

function UserView() {
const [user, setUser] = useState()

useEffect(() => {
    userAPI.getAll().then(e => setUser(e))
},[])
  return (
   <div className='p-2 min-w-full bg-white min-h-screen  rounded-lg'> 
      {user && user.map(e => {
        return(
            <div className='min-w-full border-2 rounded columns-1 shadow-lg bg-white drop-shadow p-3 my-2 flex flex-row'>
                <div className='basis-5/6'>
                    <div>
                        <strong>username : </strong> {e.username}
                    </div>
                    <div>
                        <strong>roles :</strong> {e.roles}
                    </div>
                 </div>
                 <div className='basis-1/6'>
                      <button className='p-2 w-16 border rounded-xl bg-blue-500 text-white mr-2 hover:bg-blue-600'>
                          Edit
                      </button>
                      <button className='p-2 w-16 border rounded-xl bg-red-500 text-white hover:bg-red-600'>
                          Delete
                      </button>
                 </div>
            </div>           
            )
        })}
    </div>
  )
}

export default UserView

import React,{useState, useEffect} from 'react'
import QuestCreateComponent from './QuestCreateComponent'
import DeletedQuestModal from '../../modals/DeleteQuestModal'
import questApi from '../../../../API/questApi'

function QuestionCreateForm() {
    
    const [createSubject, setCreateSubject] = useState(false)
    const [subject, setSubject] = useState()
    const [refresh, setRefresh] = useState(true)
    const [edit, setEdit] = useState(false)
    const [fill, setFill] = useState()
    const [option, setOption] = useState()
    const [createComp, setCreateComp] = useState(false)
    const [idSub, setIdSub] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const [idFor, setIdFor] = useState()

    const submitSubject = (e) => {
        e.preventDefault()

        const data = {
            subject : e.target[0].value,
            subject_Description : e.target[1].value
        }
       
        questApi.newSubject(data)
            setTimeout(()=> {
                setRefresh(!refresh)
            },2000)
    }

    const editSubject = (id) => {
        setEdit(true)
        setIdSub(id)
        questApi.GetTest(id).then( e => setFill(e.data.quest))
        questApi.GetTest(id).then( e => setOption(e.data.ans))
    }

    useEffect(() => {
        questApi.GetSubject().then(e => setSubject(e.data.subject))
    },[refresh])

    return (
   <div className='p-2 min-w-full bg-white min-h-screen  rounded-lg'>
    {edit?
        <div>
            <button onClick={() => {setEdit(false)
                                    setCreateComp(false)
            }} className='p-2 border-2 rounded-md bg-white text-gray-700 m-1'>Back</button>
            <button onClick={() => setCreateComp(!createComp)} className='p-2 rounded-md bg-green-600 text-white m-1'>Add Question</button>
        </div>            
        :
        <div>
            <button onClick={() => setCreateSubject(!createSubject)} className='p-2 rounded-md bg-green-600 text-white m-1'>Add Subject</button>
        </div>
    }
            { createSubject ?
        <form onSubmit={submitSubject}>        
            <div className='w-min-fit w-1/2 p-2 rounded columns-1 shadow-sm bg-white drop-shadow p-3 my-2'>
                <label htmlFor="create-subject">Subject Name</label>
                <input 
                id='create-subject'
                name='create-subject'
                type="text"
                className="mt-1 block w-full h-10 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <br/>
                <label htmlFor="create-description">Description</label>
                <textarea 
                id='create-description'
                name='create-description'
                type="text"
                rows={50}
                cols={60}
                className="mt-1 block w-full h-10 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <br/>
                <button name='submit' type='submit' className='p-2 bg-blue-600 text-white rounded-md m-1'>Save</button>
                <button onClick={() => setCreateSubject(false)} className='p-2 bg-red-600 text-white rounded-md m-1'>Cancel</button>
            </div>
        </form>    
            :
        <></>
        }
                
        {createComp ?
            <QuestCreateComponent 
                id_bs = {idSub}
                setEdit = {setEdit}
                setCreateComp = {setCreateComp}
            />
            :
        
        <div className='w-full mt-2'>
          {edit ?                         
          <>
          {fill && fill.map( q => {
                return(
                    <div key = {q.id}>
                    <div className='min-w-full border-2 rounded columns-1 shadow-sm bg-white drop-shadow p-3 pb-9 my-2 hover:bg-blue-200'>
                            <div className='w-full grid justify-end opacity-50'>
                                <svg onClick={()=>{
                                        setDeleteModal(true)
                                        setIdFor(q.id)
                                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h1>{q.question}</h1>

						{option && option.map(op => {
							if(op.id_qst === q.id){
                                if(op.pg === q.correct_answer){
                                    return(
                                    <div key = {op.id}>
										<input disabled={true} type="radio" id={op.id} value={op.pg} name={"option"+op.id_qst} checked/> {op.answered}
									</div>
                                    )
                                } else {
								return(
									<div>
										<input disabled={true} type="radio" id={op.id} value={op.pg} name={"option"+op.id_qst} /> {op.answered}
									</div>
								)}
							}
						})}
                </div>
                </div>
                )
            })}
          </>
          :
          <>
            {subject && subject.map(e => {
                return(
                    <a onClick={() => editSubject(e.id)} key = {e.id}>
                        <div className='min-w-full border-2 rounded columns-1 shadow-sm bg-white drop-shadow p-3 my-2 hover:bg-blue-200'>
                            <strong>{e.subject_name}</strong>
                        </div>
                    </a>                                 
                )
            })}
           </>
            } 
        </div>
        }
        <>
            <DeletedQuestModal
                deleteModal = {deleteModal}
                setDeleteModal = {setDeleteModal}
                idFor = {idFor}
                setIdFor = {setIdFor}
                setEdit = {setEdit}
                setCreateComp = {setCreateComp}
            />
        </>
    </div>
  )
}

export default QuestionCreateForm

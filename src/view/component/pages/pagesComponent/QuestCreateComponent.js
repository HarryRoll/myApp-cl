import React,{useState} from 'react'
import questApi from '../../../../API/questApi'

function QuestCreateComponent(state) {
  
    const handleOnQuest = (e) =>{
        e.preventDefault()
        const questValue = {
            question : e.target[0].value,
            correct_answer : e.target[5].value,
            id_bs : state.id_bs
        }


        questApi.newQuest(questValue).then(data => {
            const ansValue = [{
                answered : e.target[1].value,
                id_qst : data.id,
                pg : 'A'
                },
                {answered : e.target[2].value,
                id_qst : data.id,
                pg : 'B'
                },
                {answered : e.target[3].value,
                id_qst : data.id,
                pg : 'C'
                },
                {answered : e.target[4].value,
                id_qst : data.id,
                pg : 'D'
                }
            ]
            ansValue.map( ans => {
                questApi.newAnswer(ans)
                state.setEdit(false)
                state.setCreateComp(false)
            })
        })
    }
  
    return (
    <form onSubmit={handleOnQuest}>
        <div className="mt-2 w-full">
            <div className="col-span-2 sm:col-span-4 my-2">
                <label htmlFor="last-name" className="block text-md font-medium text-gray-700">
                    Question
                </label>
                <input
                    type="text"
                    name="question"
                    id="question"
                    className="mt-1 block w-full h-10 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="flex flex-row col-span-6 sm:col-span-4 my-2">
                <label htmlFor="email-address" className="block text-md font-medium text-gray-700 p-3">
                    <strong>A</strong>
                </label>
                <input
                    type="text"
                    name="A"
                    id="A"
                    className="mt-1 block w-full h-10 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

                <div className="flex col-span-6 sm:col-span-4 my-2">
                <label htmlFor="email-address" className="block text-md font-medium text-gray-700 p-3">
                    <strong>B</strong>
                </label>
                <input
                    name="B"
                    id="B"
                    className="mt-1 block w-full h-10 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="flex col-span-6 sm:col-span-4 my-2">
                <label htmlFor="email-address" className="block text-md font-medium text-gray-700 p-3">
                    <strong>C</strong>
                </label>
                <input
                    name="C"
                    id="C"
                    className="mt-1 block w-full h-10 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="flex col-span-6 sm:col-span-4 my-2">
                <label htmlFor="email-address" className="block text-md font-medium text-gray-700 p-3">
                    <strong>D</strong>
                </label>
                <input
                    name="D"
                    id="D"
                    className="mt-1 block w-full h-10 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="underline_select" className="sr-only">Underline select</label>
                <select defaultValue={""} id="underline_select" className="block py-2.5 px-2 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 appearance-none dark:text-gray-700 dark:border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300 peer">
                    <option value="">Choose a correct answer</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>              
        </div>
        <div className='w-full grid justify-end mt-2'>
            <button name='submit' type='submit' className='p-2 rounded-md bg-green-600 text-white m-1'>Save</button>
        </div>
    </form>
  )
}

export default QuestCreateComponent

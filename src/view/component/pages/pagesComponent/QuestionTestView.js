import React,{useState, useEffect, useContext, useRef} from 'react'
import questApi from '../../../../API/questApi'
import { useParams } from 'react-router-dom'
import scoreAPI from '../../../../API/scoreAPI'
import { useNavigate } from 'react-router-dom'
import ProfileScore from './ProfileScore'

function QuestionTestView(auth) {
const [test, setTest] = useState()
const [option, setOption] = useState()
const [inputs, setInputs] = useState({})
const [timer,setTimer] = useState(300)

const navigate = new useNavigate()

let {id} = useParams()
const user_id = auth.auth.id

const onChangeValue = (event) => {
    const id_value = event.target.id;
    const value = event.target.value;
    setInputs(values => ({...values, [id_value]: value, id:id, user_id : user_id}))
  }
const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(inputs);
	scoreAPI.saveScore(inputs).then(e => console.log(e))
	navigate('/')
  }
  
setTimeout(() => {
	if(timer > 0){
	setTimer(timer-1)
}else{
	document.getElementById('submit').click();
}
},[1000])


useEffect(() => {
    questApi.GetTest(id).then(e => {
		setTest(e.data.quest)
		setOption(e.data.ans)
	})
},[])
  return (
   <div className='p-2 min-w-full bg-white min-h-screen  rounded-lg'>
	<div className= "text-right mr-2">
		<strong>{timer}</strong>
	</div>
		<form onSubmit={handleSubmit}>
		  {test && test.map(e => {
			return(
				<div className='min-w-full border-2 rounded columns-1 shadow-lg bg-white drop-shadow p-3 my-2 flex flex-row'>
					<div className='basis-5/6'>
						<div>
							<strong> {e.question} </strong>
						</div>
						
						{option && option.map(op => {
							if(op.id_qst === e.id){
								return(
									<div onChange={onChangeValue}>
										<input type="radio" id={op.id} value={op.pg} name={"option"+op.id_qst} /> {op.answered}
									</div>
								)
							}
						})}
					 </div>
				</div>           
				)
			})}
			<div className="w-full grid justify-end">
				<button type="submit" value="Submit" id='submit' className="p-2 bg-green-500 rounded-md text-white w-fit">Save</button>
			</div>
		</form>
    </div>
  )
}

export default QuestionTestView

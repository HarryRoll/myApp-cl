import axios from "axios";
import Cookies from "universal-cookie";

const config = 'http://localhost:8000/api';
const token = new Cookies().get('Auth') 

const  GetSubject = async() => {
    try {
        const result = await axios.get(`${config}/subject`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const GetTest = async(id) => {
	try{
		const result = await axios.get(`${config}/subject/${id}`)
		return result.data
	}catch(error){
		return await error.message
	}
}

const newSubject = async(data) => {
    try {
        const result = await axios.post(`${config}/subject`, data, {
            withCredentials : true,
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return result
    } catch (error) {
        return await error.message
    }
}

const newQuest = async(data) => {
    try {
        const result = await axios.post(`${config}/quest`, data, {
            withCredentials : true,
            headers :{
                Authorization : `Bearer ${token}`
            }
        })
        return result.data
    } catch (error) {
        return await error.message
    }
}

const newAnswer = async(data) => {
    try {
        const result = await axios.post(`${config}/answered`, data, {
            withCredentials : true,
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return result
    } catch (error) {
        return await error.message
    }
}

const deleteAns = async(id) => {
    try {
        const result = await axios.delete(`${config}/answered/${id}`, {
            withCredentials : true,
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return result.data 
    } catch (error) {
        return await error.message 
    }
}

export default {
    GetSubject,
	GetTest,
    newSubject,
    newQuest,
    newAnswer,
    deleteAns
}
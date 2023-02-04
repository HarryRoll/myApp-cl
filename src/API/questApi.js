import axios from "axios";

const config = 'http://localhost:8000/api';

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

export default {
    GetSubject,
	GetTest
}
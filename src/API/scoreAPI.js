import axios from "axios";

const config = 'http://localhost:8000/api'

const getScore = async(id) => {
    try {
        const result = await axios.get(`${config}/score/${id}`)
        return result.data
    } catch (error) {
        return await error.message        
    }
}

const saveScore = async(data) => {
	try{
		const result = await axios.post(`${config}/score`, data, {
			withCredentials : true
		})
		return result
	}catch(error){
		return await error.message
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getScore,
	saveScore
	}
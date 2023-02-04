import axios from "axios";

const config = 'http://localhost:8000/api';

const getAll = async() => {
    try {
        const result = await axios.get(`${config}/users`)
        return result.data.data
    } catch (error) {
        return error.message
    }
} 

const createUser = async(payload) => {
    try {
        const result = await axios.post(`${config}/user`, payload, {
            withCredentials : true
        })
        return result 
    } catch (error) {
        return await error.message
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    createUser
}

import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = 'http://localhost:8000/api';


const login = async(payload) => {
    try{
    const result = await axios.post(`${config}/login`, payload, {
        withCredentials : true
    })
        toast.success("Account Vertify!")  
        return result.data
    } catch(error){
        toast.error("Bad Credentisals!") 
        return console.log(error.message)
    }
}

const reqCSRF = async() => {
    try {
        const result = await axios.get(`http://localhost:8000/sanctum/csrf-cookie`, {
            withCredentials : true
        })
        return result
    } catch (error) {
        return await error.message
    }
}

const getUser = async(token) => {
    try {
    const result = await axios.get(`${config}/getuser`, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
        return result.data
    } catch (error) {
        return await error.message
    }
}

const logout = () => {
    try {
        const result = axios.post(`${config}/logout`, {}, {
            withCredentials : true,
            headers : {
                Authorization : `Bearer ${new Cookies().get('Auth')}`
            }
        })
        toast.success("Log out succesed!") 
        return result
    } catch (error) {
        return error.message
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    reqCSRF,
    getUser,
    logout
}
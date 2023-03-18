import axios from "axios";
import {ApiContants} from "../contants";

const AuthRequest = axios.create({
    baseURL: ApiContants.BACKEND_API.BASE_API_URL,
})

const register = async (user) => {
    if(!user.username || !user?.email || !user?.password){
        return {status: false, message: 'Pleae fill up all fields'};
    }

    try{
        let requestBody = {
            username: user?.username,
            email: user?.email,
            password: user?.password
        }
        //let registerResponse = await AuthRequest.post(ApiContants.BACKEND_API.REGISTER, requestBody)
        let registerResponse = await axios.post('http://10.0.2.2:8000/v1/auth/register', requestBody);
        return registerResponse?.data
        
    } catch(err){
        console.log(err)
        return {status: false, message: 'Something went wrong '};
    }
}


const login = async (user) => {
    if(!user.username || !user?.password){
        return {status: false, message: 'Pleae fill up all fields'};
    }

    try{
        let requestBody = {
            username: user?.username,
            password: user?.password
        }
        //let registerResponse = await AuthRequest.post(ApiContants.BACKEND_API.REGISTER, requestBody)
        let loginResponse = await axios.post('http://10.0.2.2:8000/v1/auth/login', requestBody);
        return loginResponse?.data
        
    } catch(err){
        console.log(err)
        return {status: false, message: 'Something went wrong '};
    }
}

export default {register, login}
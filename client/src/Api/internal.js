import axios from "axios";
import { useSelector } from "react-redux";

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_PATH,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
    },
});
export const getworkouts = async(userId)=>{
    let response ;
    try {
        response = await api.get(`/userworkouts/${userId}`);
    } catch (error) {
        return error;
    }
    return response;
}
export const searchworkouts = async(data)=>{
    let response ;
    try {
        response = await api.post(`/searchworkout`,data);
    } catch (error) {
        return error;
    }
    return response;
}
export const login = async(data)=>{
    let response ;
    try {
        response = await api.post('/login',data);
    } catch (error) {
        return error;
    }
    return response;
}
export const signup = async(data)=>{
    let response;
    try {
        response = await api.post('/reguser',data)
    } catch (error) {
        return error;
    }
    return response;
}
export const signout = async()=>{
    let response;
    try {
        response = await api.post('/logout')

    } catch (error) {
        return error;
    }
    return response;
}
export const createworkout = async(data)=>{
    let response;
    try {
        response = await api.post('/createworkout',data)

    } catch (error) {
        return error;
    }
    return response;
}

//auto-refresh Token
// check all the protected resource
// refresh Token if token is expired
// carry on the protected resource 

api.interceptors.response.use(
    config=>config,
    async(error)=>{
        const originalRequest = error.config;
        if((error.response.status === 401 || error.response.status === 500) && originalRequest && !originalRequest.isRetry){
            originalRequest.isRetry = true;
            try {
                await axios.get(`${process.env.REACT_APP_BACKEND_PATH}/refresh`,{
                    withCredentials:true
                });
                return api.request(originalRequest);
            } catch (error) {
                return error;
            }
        }
    }
)
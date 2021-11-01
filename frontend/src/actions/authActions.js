import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOGOUT_REQUEST } from "../constants/authConstants";
import axios from "axios";
//Login
export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});
        const {data}=await axios({
                        method: 'POST',
                        url: `/api/v1/auth/login`,
                   withCredentials: true,
                        data:{
                            email:email,
                            password:password
                        },
        })
        window.localStorage.setItem('user',JSON.stringify(data.user));
        dispatch({type:LOGIN_SUCCESS,payload:data.user});
    }catch(err){
        dispatch({type:LOGIN_FAIL,payload:err.message});
    }
}

export const register=(username,email,password)=>async(dispatch)=>{
try{
        dispatch({type:REGISTER_USER_REQUEST});
        const {data}=await axios({
                        method: 'POST',
                        url: "/api/v1/auth/register",
                        data:{
                            username:username,
                            email:email,
                            password:password,
                        },
                        withCredentials: true,
        })
        window.localStorage.setItem('user',JSON.stringify(data.user));

        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user});
    }catch(err){
        dispatch({type:REGISTER_USER_FAIL,payload:err.response.data.message});
    }
}

export const logout=()=>async(dispatch)=>{
    try{
        dispatch({type:LOGOUT_REQUEST})
        await axios.get("/api/v1/auth/logout");
    
        window.localStorage.removeItem("user");
        dispatch({type:LOGOUT_SUCCESS});
    }
    catch(err){
        dispatch({type:LOGOUT_FAIL,payload:err.response.data.message})
    }
}
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
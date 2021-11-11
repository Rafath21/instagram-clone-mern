import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOGOUT_REQUEST } from "../constants/authConstants";
import axios from "axios";
import{UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAILED} from "../constants/profileConstants"
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
                        headers:{"Content-type":"Application/json"}
        })
        window.localStorage.setItem('user',JSON.stringify(data.user));
        dispatch({type:LOGIN_SUCCESS,payload:data.user});
    }catch(err){
        dispatch({type:LOGIN_FAIL,payload:err});
    }
}

export const register=(email,password)=>async(dispatch)=>{
try{
        dispatch({type:REGISTER_USER_REQUEST});
        const {data}=await axios({
                        method: 'POST',
                        url: "/api/v1/auth/register",
                        data:{
                            email:email,
                            password:password,
                        },
                        withCredentials: true,
                         headers: {
    'Content-Type': 'application/json'
    }
        })
        window.localStorage.setItem('user',JSON.stringify(data.user));

        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user});
    }catch(err){
        dispatch({type:REGISTER_USER_FAIL,payload:err});
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
        dispatch({type:LOGOUT_FAIL,payload:err})
    }
}
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};


export const updateProfile=(userid,username,typeOfAccount,bio,pfp)=>async(dispatch)=>{
     try{
        dispatch({type:UPDATE_PROFILE_REQUEST});
        const {data}=await axios({
            method:'POST',
            url:`/api/v1/setup/${userid}`,
            withCredentials:true,
            data:{
                bio,
                username,
                typeOfAccount,
                pfp
            },
           headers:{"Content-type":"Application/json"}
        })
        window.localStorage.setItem('user',JSON.stringify(data.user));
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.user})
    }catch(err){
        dispatch({type:UPDATE_PROFILE_FAILED,payload:err})
    }
}
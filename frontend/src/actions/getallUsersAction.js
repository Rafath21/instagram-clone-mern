import {GET_ALL_USERS_REQUEST,GET_ALL_USERS_SUCCESS,GET_ALL_USERS_FAILED} from "../constants/usersConstants";

export const getUsers=(userid)=>async(dispatch)=>{
    try{
        dispatch({type:GET_ALL_USERS_REQUEST});
        const {data}=await axios({
            method:'GET',
            url:`http://localhost:7000/api/v1/users/${userid}`,
            withCredentials:true,
        })
        dispatch({type:GET_ALL_USERS_SUCCESS,payload:data.users})
    }catch(err){
        dispatch({type:GET_ALL_USERS_FAILED,payload:err})
    }
}
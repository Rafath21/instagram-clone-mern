import { GET_PROFILE_REQUEST,GET_PROFILE_SUCCESS,GET_PROFILE_FAILED,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAILED } from "../constants/profileConstants"

export const getProfile=(userid,ouid)=>async(dispatch)=>{
 try{
        dispatch({type:GET_PROFILE_REQUEST});
        const {data}=await axios({
            method:'GET',
            url:`http://localhost:6000/api/v1/profile/${userid}`,
            withCredentials:true,
            data:{
                ouid:ouid,
                userid:userid
            }
        })
        dispatch({type:GET_PROFILE_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_PROFILE_FAILED,payload:err})
    }
}
export const updateProfile=(userid,username,typeOfAccount,bio,pfp)=>async(dispatch)=>{
     try{
        dispatch({type:GET_PROFILE_REQUEST});
        const {data}=await axios({
            method:'POST',
            url:`http://localhost:6000/api/v1/profile/${userid}`,
            withCredentials:true,
            data:{
                userid,
                username,
                typeOfAccount,
                bio,
                pfp
            }
        })
        dispatch({type:GET_PROFILE_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_PROFILE_FAILED,payload:err})
    }
}
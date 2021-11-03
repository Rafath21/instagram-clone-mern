import { GET_PROFILE_REQUEST,GET_PROFILE_SUCCESS,GET_PROFILE_FAILED } from "../constants/profileConstants"
import axios from "axios";
export const getProfile=(userid,ouid)=>async(dispatch)=>{
 try{
        dispatch({type:GET_PROFILE_REQUEST});
        const {data}=await axios({
            method:'POST',
            url:`http://localhost:7000/api/v1/profile/${userid}`,
            withCredentials:true,
            data:{
                ouid:ouid,
            },
           headers:{"Content-type":"Application/json"}

        })
        dispatch({type:GET_PROFILE_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_PROFILE_FAILED,payload:err})
    }
}

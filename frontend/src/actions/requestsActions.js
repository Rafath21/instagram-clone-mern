import {ACCEPT_REQUEST_REQUEST,ACCEPT_REQUEST_SUCCESS,ACCEPT_REQUEST_FAILED , DELETE_REQUEST_REQUEST,DELETE_REQUEST_SUCCESS,DELETE_REQUEST_FAILED} from "../constants/requestsConstants"
import { DELETE_ACTIVITY_REQUEST,DELETE_ACTIVITY_SUCCESS,DELETE_ACTIVITY_FAILED , SEND_REQUEST_SUCCESS, SEND_REQUEST_REQUEST,SEND_REQUEST_FAILED} from "../constants/requestsConstants";
import axios from "axios";

export const acceptRequest=(userid,ouid)=>async(dispatch)=>{
 try{
        dispatch({type:ACCEPT_REQUEST_REQUEST});
        const {data}=await axios({
            method:'POST',
            url:`/api/v1/requests/acceptRequest/${userid}`,
            withCredentials:true,
            data:{
                ouid:ouid,
            }
        })
        dispatch({type:ACCEPT_REQUEST_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:ACCEPT_REQUEST_FAILED,payload:err})
    }
}
export const deleteRequest=(userid,ouid)=>async(dispatch)=>{
 try{
        dispatch({type:DELETE_REQUEST_REQUEST});
        const {data}=await axios({
            method:'DELETE',
            url:`/api/v1/requests/deleteRequest/${userid}`,
            withCredentials:true,
            data:{
                ouid:ouid,
            }
        })
        dispatch({type:DELETE_REQUEST_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:DELETE_REQUEST_FAILED,payload:err})
    }
}
export const deleteActivity=(userid,ouid)=>async(dispatch)=>{
 try{
        dispatch({type:DELETE_ACTIVITY_REQUEST});
        const {data}=await axios({
            method:'DELETE',
            url:`/api/v1/activity/deleteActivity/${userid}`,
            withCredentials:true,
            data:{
                ouid:ouid,
            }
        })
        dispatch({type:DELETE_ACTIVITY_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:DELETE_ACTIVITY_FAILED,payload:err})
    }
}
export const sendRequest=(userid,ouid)=>async(dispatch)=>{
 try{
        dispatch({type:SEND_REQUEST_REQUEST});
        const {data}=await axios({
            method:'POST',
            url:`/api/v1/requests/handleRequest/${userid}`,
            withCredentials:true,
            data:{
                ouid:ouid,
            }
        })
        dispatch({type:SEND_REQUEST_SUCCESS,payload:data.followStatus})
    }catch(err){
        dispatch({type:SEND_REQUEST_FAILED,payload:err})
    }
}
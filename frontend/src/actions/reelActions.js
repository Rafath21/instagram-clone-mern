import { LIKE_A_REEL_REQUEST,LIKE_A_REEL_SUCCESS,LIKE_A_REEL_FAILED } from "../constants/reelConstants"
import { COMMENT_REEL_REQUEST,COMMENT_REEL_SUCCESS,COMMENT_REEL_FAILED } from "../constants/reelConstants"
import { CREATE_REEL_REQUEST,CREATE_REEL_SUCCESS,CREATE_REEL_FAILED } from "../constants/reelConstants"
import axios from "axios";

export const likeReel=(userid,reelid)=>async(dispatch)=>{
    try{
        dispatch({type:LIKE_A_REEL_REQUEST});
        const {data}=await axios({
            method:'PUT',
            url:`/api/v1/reel/likes/${userid}`,
            withCredentials:true,
            data:{
                reelid
            }
        })
        dispatch({type:LIKE_A_REEL_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:LIKE_A_REEL_FAILED,payload:err})
    }
}
export const commentReel=(userid,comment,reelid)=>async(dispatch)=>{
    try{
        dispatch({type:COMMENT_REEL_REQUEST});
        const {data}=await axios({
            method:'PUT',
            url:`/api/v1/reel/comments/${userid}`,
            withCredentials:true,
            data:{
                reelid,comment
            }
        })
        dispatch({type:COMMENT_REEL_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:COMMENT_REEL_FAILED,payload:err})
    }
}
export const createReel=(userid,reelurl,caption)=>async(dispatch)=>{
    try{
        dispatch({type:CREATE_REEL_REQUEST});
        const {data}=await axios({
            method:'POST',
            url:`/api/v1/reel/${userid}`,
            withCredentials:true,
            data:{
                reelurl,caption
            }
        })
        dispatch({type:CREATE_REEL_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:CREATE_REEL_FAILED,payload:err})
    }
}
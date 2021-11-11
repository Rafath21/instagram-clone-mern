import { LIKE_A_POST_REQUEST,LIKE_A_POST_SUCCESS,LIKE_A_POST_FAILED } from "../constants/postConstants"
import { COMMENT_POST_REQUEST,COMMENT_POST_SUCCESS,COMMENT_POST_FAILED } from "../constants/postConstants"
import { CREATE_POST_REQUEST,CREATE_POST_SUCCESS,CREATE_POST_FAILED } from "../constants/postConstants"
import axios from "axios";

export const likePost=(userid,postid)=>async(dispatch)=>{
    try{
        dispatch({type:LIKE_A_POST_REQUEST});
        const {data}=await axios({
            method:'PUT',
            url:`/api/v1/post/likes/${userid}`,
            withCredentials:true,
            data:{
                postid:postid
            }
        })
        dispatch({type:LIKE_A_POST_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:LIKE_A_POST_FAILED,payload:err})
    }
}
export const commentPost=(userid,comment,postid)=>async(dispatch)=>{
    try{
        dispatch({type:COMMENT_POST_REQUEST});
        const {data}=await axios({
            method:'PUT',
            url:`/api/v1/post/comments/${userid}`,
            withCredentials:true,
            data:{
                postid:postid,
                comment:comment
            }
        })
        dispatch({type:COMMENT_POST_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:COMMENT_POST_FAILED,payload:err})
    }
}
export const createPost=(userid,posturl,caption)=>async(dispatch)=>{
    try{
        dispatch({type:CREATE_POST_REQUEST});
        const {data}=await axios({
            method:'POST',
            url:`/api/v1/post/${userid}`,
            withCredentials:true,
            data:{
               posturl,caption
            }
        })
        dispatch({type:CREATE_POST_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:CREATE_POST_FAILED,payload:err})
    }
}
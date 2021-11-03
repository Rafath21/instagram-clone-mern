import {CREATE_STORY_REQUEST,CREATE_STORY_SUCCESS,CREATE_STORY_FAILED} from "../constants/storyConstants"
import { GET_OWN_STORY_REQUEST,GET_OWN_STORY_SUCCESS,GET_OWN_STORY_FAILED } from "../constants/storyConstants";
import axios from "axios";

export const createStory=(userid,storyurl,caption)=>async(dispatch)=>{
    try{
        dispatch({type:CREATE_STORY_REQUEST});
        const {data}=await axios({
            method:'POST',
            url:`http://localhost:7000/api/v1/story/${userid}`,
            withCredentials:true,
            data:{
                storyurl,caption
            }
        })
        dispatch({type:CREATE_STORY_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:CREATE_STORY_FAILED,payload:err})
    }
}
export const getOwnStory=(userid)=>async(dispatch)=>{
    try{
        dispatch({type:GET_OWN_STORY_REQUEST});
        const {data}=await axios({
            method:'GET',
            url:`http://localhost:7000/api/v1/story/${userid}`,
            withCredentials:true,
        })
        dispatch({type:GET_OWN_STORY_SUCCESS,payload:data.stories})
    }catch(err){
        dispatch({type:GET_OWN_STORY_FAILED,payload:err})
    }
}
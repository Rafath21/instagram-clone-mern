import { FEED_POSTS_REQUEST,FEED_POSTS_SUCCESS,FEED_POSTS_FAILED,FEED_REELS_REQUEST,FEED_REELS_SUCCESS,FEED_REELS_FAILED,FEED_ACTIVITY_REQUEST,FEED_ACTIVITY_SUCCESS,FEED_ACTIVITY_FAILED,FEED_REQUESTS_REQUEST,FEED_REQUESTS_SUCCESS,FEED_REQUESTS_FAILED,FEED_STORIES_REQUEST,FEED_STORIES_SUCCESS,FEED_STORIES_FAILED} from "../constants/feedConstants";
import axios from "axios";
export const postfeed=(userid)=>async(dispatch)=>{
    try{
        dispatch({type:FEED_POSTS_REQUEST});
        const {data}=await axios({
            method:'GET',
            url:`http://localhost:7000/api/v1/feed/posts/${userid}`,
            withCredentials:true,
        })
        dispatch({type:FEED_POSTS_SUCCESS,payload:data.postFeed})
    }catch(err){
        dispatch({type:FEED_POSTS_FAILED,payload:err})
    }
}
export const reelfeed=(userid)=>async(dispatch)=>{
   try{
        dispatch({type:FEED_REELS_REQUEST});
        const {data}=await axios({
            method:'GET',
            url:`http://localhost:7000/api/v1/feed/reels/${userid}`,
            withCredentials:true,
        })
        dispatch({type:FEED_REELS_SUCCESS,payload:data.reelFeed})
    }catch(err){
        dispatch({type:FEED_REELS_FAILED,payload:err})
    }
}
export const activityfeed=(userid)=>async(dispatch)=>{
    try{
        dispatch({type:FEED_ACTIVITY_REQUEST});
        const {data}=await axios({
            method:'GET',
            url:`http://localhost:7000/api/v1/feed/activity/${userid}`,
            withCredentials:true,
        })
        dispatch({type:FEED_ACTIVITY_SUCCESS,payload:data.activityFeed})
    }catch(err){
        dispatch({type:FEED_ACTIVITY_FAILED,payload:err})
    }
}
export const requestsfeed=(userid)=>async(dispatch)=>{
   try{
        dispatch({type:FEED_REQUESTS_REQUEST});
        const {data}=await axios({
            method:'GET',
            url:`http://localhost:7000/api/v1/feed/requestsfeed/${userid}`,
            withCredentials:true,
        })
        dispatch({type:FEED_REQUESTS_SUCCESS,payload:data.requestsFeed})
    }catch(err){
        dispatch({type:FEED_REQUESTS_FAILED,payload:err})
    }
}
export const storiesfeed=(userid)=>async(dispatch)=>{
   try{
        dispatch({type:FEED_STORIES_REQUEST});
        const {data}=await axios({
            method:'GET',
            url:`http://localhost:7000/api/v1/feed/stories/${userid}`,
            withCredentials:true,
        })
        dispatch({type:FEED_STORIES_SUCCESS,payload:data.storyFeed})
    }catch(err){
        dispatch({type:FEED_STORIES_FAILED,payload:err})
    }
}

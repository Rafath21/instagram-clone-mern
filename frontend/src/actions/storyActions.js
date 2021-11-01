import {CREATE_STORY_REQUEST,CREATE_STORY_SUCCESS,CREATE_STORY_FAILED} from "../constants/storyConstants"
export const createStory=(userid,storyurl,caption)=>async(dispatch)=>{
    try{
        dispatch({type:CREATE_STORY_REQUEST});
        const {data}=await axios({
            method:'POST',
            url:`http://localhost:6000/api/v1/story/${userid}`,
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
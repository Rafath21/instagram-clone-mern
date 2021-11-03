import {CREATE_STORY_REQUEST,CREATE_STORY_SUCCESS,CREATE_STORY_FAILED} from "../constants/storyConstants";
import { GET_OWN_STORY_REQUEST,GET_OWN_STORY_SUCCESS,GET_OWN_STORY_FAILED } from "../constants/storyConstants";
export const createStoryReducer=(state={isStoryCreated:false},action)=>{
    switch(action.type){
        case CREATE_STORY_REQUEST:
            return{
                loadingStory:true,
                isStoryCreated:false
            }
        
        case CREATE_STORY_SUCCESS:
            return{
                loadingStory:false,
                isStoryCreated:true
            }
        
        case CREATE_STORY_FAILED:
            return{
                loadingStory:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
export const getOwnStoryReducer=(state={ownStories:[]},action)=>{
    switch(action.type){
        case GET_OWN_STORY_REQUEST:
            return{
                loadingStory:true,
                ownStories:[]
            }
        case GET_OWN_STORY_SUCCESS:
            return{
                loadingStory:false,
                ownStories:action.payload
            }
        
        case GET_OWN_STORY_FAILED:
            return{
                loadingStory:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
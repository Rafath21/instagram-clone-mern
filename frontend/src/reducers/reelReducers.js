import { LIKE_A_REEL_REQUEST,LIKE_A_REEL_SUCCESS,LIKE_A_REEL_FAILED } from "../constants/reelConstants"
import { COMMENT_REEL_REQUEST,COMMENT_REEL_SUCCESS,COMMENT_REEL_FAILED } from "../constants/reelConstants"
import { CREATE_REEL_REQUEST,CREATE_REEL_SUCCESS,CREATE_REEL_FAILED } from "../constants/reelConstants"
export const updateReelLikesReducer=(state={isReelLikeUpdated:false},action)=>{
    switch(action.type){
        case LIKE_A_REEL_REQUEST:
            return{
                loadingReelLikeUpdated:true,
                isReelLikeUpdated:false
            }
        
        case LIKE_A_REEL_SUCCESS:
            return{
                loadingReelLikeUpdated:false,
                isReelLikeUpdated:true
            }
        
        case LIKE_A_REEL_FAILED:
            return{
                loadingReelLikeUpdated:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}

export const updateReelCommentsReducer=(state={isReelCommentUpdated:false},action)=>{
    switch(action.type){
        case COMMENT_REEL_REQUEST:
            return{
                loadingReelCommentUpdated:true,
                isReelCommentUpdated:false
            }
        
        case COMMENT_REEL_SUCCESS:
            return{
                loadingReelCommentUpdated:false,
                isReelCommentUpdated:true
            }
        
        case COMMENT_REEL_FAILED:
            return{
                loadingReelCommentUpdated:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
export const createReelReducer=(state={isReelCreated:false},action)=>{
    switch(action.type){
        case CREATE_REEL_REQUEST:
            return{
                loadingReel:true,
                isReelCreated:false
            }
        
        case CREATE_REEL_SUCCESS:
            return{
                loadingReel:false,
                isReelCreated:true
            }
        
        case CREATE_REEL_FAILED:
            return{
                loadingReel:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
import { LIKE_A_POST_REQUEST,LIKE_A_POST_SUCCESS,LIKE_A_POST_FAILED } from "../constants/postConstants"
import { COMMENT_POST_REQUEST,COMMENT_POST_SUCCESS,COMMENT_POST_FAILED } from "../constants/postConstants"
import { CREATE_POST_REQUEST,CREATE_POST_SUCCESS,CREATE_POST_FAILED } from "../constants/postConstants"
export const updateLikesReducer=(state={isLikeUpdated:false},action)=>{
    switch(action.type){
        case LIKE_A_POST_REQUEST:
            return{
                loadingLikeUpdated:true,
                isLikeUpdated:false
            }
        
        case LIKE_A_POST_SUCCESS:
            return{
                loadingLikeUpdated:false,
                isLikeUpdated:true
            }
        
        case LIKE_A_POST_FAILED:
            return{
                loadingLikeUpdated:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}

export const updateCommentsReducer=(state={isCommentUpdated:false},action)=>{
    switch(action.type){
        case COMMENT_POST_REQUEST:
            return{
                loadingCommentUpdated:true,
                isCommentUpdated:false
            }
        
        case COMMENT_POST_SUCCESS:
            return{
                loadingCommentUpdated:false,
                isCommentUpdated:true
            }
        
        case COMMENT_POST_FAILED:
            return{
                loadingCommentUpdated:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
export const createPostReducer=(state={isPostCreated:false},action)=>{
    switch(action.type){
        case CREATE_POST_REQUEST:
            return{
                loadingPosted:true,
                isPostCreated:false
            }
        
        case CREATE_POST_SUCCESS:
            return{
                loadingPosted:false,
                isPostCreated:true
            }
        
        case CREATE_POST_FAILED:
            return{
                loadingPosted:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
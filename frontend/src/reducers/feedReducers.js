import { FEED_POSTS_REQUEST,FEED_POSTS_SUCCESS,FEED_POSTS_FAILED,FEED_REELS_REQUEST,FEED_REELS_SUCCESS,FEED_REELS_FAILED,FEED_ACTIVITY_REQUEST,FEED_ACTIVITY_SUCCESS,FEED_ACTIVITY_FAILED,FEED_REQUESTS_REQUEST,FEED_REQUESTS_SUCCESS,FEED_REQUESTS_FAILED,FEED_STORIES_REQUEST,FEED_STORIES_SUCCESS,FEED_STORIES_FAILED

} from "../constants/feedConstants";

export const getPostsFeedReducer=(state={feedPosts:[]},action)=>{
    switch(action.type){
        case FEED_POSTS_REQUEST:
            return{
                loadingFeedPosts:true,
                feedPosts:[]
            }
        
        case FEED_POSTS_SUCCESS:
            return{
                loadingFeedPosts:false,
                feedPosts:action.payload
            }
        
        case FEED_POSTS_FAILED:
            return{
                loadingFeedPosts:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}

export const getReelsFeedReducer=(state={feedReels:[]},action)=>{
    switch(action.type){
        case FEED_REELS_REQUEST:
            return{
                loadingFeedReels:true,
                feedReels:[]
            }
        
        case FEED_REELS_SUCCESS:
            return{
                loadingFeedReels:false,
                feedReels:action.payload
            }
        
        case FEED_REELS_FAILED:
            return{
                loadingFeedReels:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}

export const getActivityFeedReducer=(state={feedActivity:[]},action)=>{
    switch(action.type){
        case FEED_ACTIVITY_REQUEST:
            return{
                loadingFeedActivity:true,
                feedActivity:[]
            }
        
        case FEED_ACTIVITY_SUCCESS:
            return{
                loadingFeedActivity:false,
                feedActivity:action.payload
            }
        
        case FEED_ACTIVITY_FAILED:
            return{
                loadingFeedActivity:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
export const getRequestsFeedReducer=(state={feedRequests:[]},action)=>{
    switch(action.type){
        case FEED_REQUESTS_REQUEST:
            return{
                loadingFeedRequests:true,
                feedRequests:[]
            }
        
        case FEED_REQUESTS_SUCCESS:
            return{
                loadingFeedRequests:false,
                feedRequests:action.payload
            }
        
        case FEED_REQUESTS_FAILED:
            return{
                loadingFeedRequests:false,
                error:action.payload
            }
        
         default:
             return state;
    }    
}
export const getStoriesFeedReducer=(state={feedStories:[]},action)=>{
    switch(action.type){
        case FEED_STORIES_REQUEST:
            return{
                loadingFeedStories:true,
                feedStories:[]
            }
        
        case FEED_STORIES_SUCCESS:
            return{
                loadingFeedStories:false,
                feedStories:action.payload
            }
        
        case FEED_STORIES_FAILED:
            return{
                loadingFeedStories:false,
                error:action.payload
            }
        
         default:
             return state;
    }    
}
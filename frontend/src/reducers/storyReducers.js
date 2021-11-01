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
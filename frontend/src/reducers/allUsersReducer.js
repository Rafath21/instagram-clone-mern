import {GET_ALL_USERS_REQUEST,GET_ALL_USERS_SUCCESS,GET_ALL_USERS_FAILED} from "../constants/usersConstants";
export const allUsersReducer=(state={allUsers:[]},action)=>{
    switch(action.type){
        case GET_ALL_USERS_REQUEST:
            return{
                loadingUsers:true,
                feedPosts:[]
            }
        
        case GET_ALL_USERS_SUCCESS:
            return{
                loadingUsers:false,
                allUsers:action.payload
            }
        
        case GET_ALL_USERS_FAILED:
            return{
                loadingUsers:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
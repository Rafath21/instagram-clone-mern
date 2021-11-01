import {ACCEPT_REQUEST_REQUEST,ACCEPT_REQUEST_SUCCESS,ACCEPT_REQUEST_FAILED , DELETE_REQUEST_REQUEST,DELETE_REQUEST_SUCCESS,DELETE_REQUEST_FAILED} from "../constants/requestsConstants"
export const acceptRequestReducer=(state={isRequestAccepted:false},action)=>{
    switch(action.type){
        case ACCEPT_REQUEST_REQUEST:
            return{
                loadingAcceptRequest:true,
                isRequestAccepted:false
            }
        
        case ACCEPT_REQUEST_SUCCESS:
            return{
                loadingAcceptRequest:false,
                isRequestAccepted:true
            }
        
        case ACCEPT_REQUEST_FAILED:
            return{
                loadingAcceptRequest:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
export const deleteRequestReducer=(state={isRequestDeleted:false},action)=>{
    switch(action.type){
        case DELETE_REQUEST_REQUEST:
            return{
                loadingDeleteRequest:true,
                isRequestDeleted:false
            }
        
        case DELETE_REQUEST_SUCCESS:
            return{
                loadingDeleteRequest:false,
                isRequestDeleted:true
            }
        
        case DELETE_REQUEST_FAILED:
            return{
                loadingDeleteRequest:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
export const deleteActivityReducer=(state={isActivityDeleted:false},action)=>{
    switch(action.type){
        case DELETE_REQUEST_REQUEST:
            return{
                loadingDeleteActivity:true,
                isActivityDeleted:false
            }
        
        case DELETE_REQUEST_SUCCESS:
            return{
                loadingDeleteActivity:false,
                isActivityDeleted:true
            }
        
        case DELETE_REQUEST_FAILED:
            return{
                loadingDeleteActivity:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
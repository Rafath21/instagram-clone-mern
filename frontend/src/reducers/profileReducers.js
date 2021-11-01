import { GET_PROFILE_REQUEST,GET_PROFILE_SUCCESS,GET_PROFILE_FAILED,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAILED } from "../constants/profileConstants"
export const getProfileReducer=(state={profile:{}},action)=>{
    switch(action.type){
        case GET_PROFILE_REQUEST:
            return{
                loadingProfile:true,
                profile:{}
            }
        
        case GET_PROFILE_SUCCESS:
            return{
                loadingProfile:false,
                profile:action.payload
            }
        
        case GET_PROFILE_FAILED:
            return{
                loadingProfile:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}

export const updateProfileReducer=(state={isProfileUpdated:false},action)=>{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
            return{
                loadingProfileUpdate:true,
                isProfileUpdated:false
            }
        
        case UPDATE_PROFILE_SUCCESS:
            return{
                loadingProfileUpdate:false,
                isProfileUpdated:true
            }
        
        case UPDATE_PROFILE_FAILED:
            return{
                loadingProfileUpdate:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
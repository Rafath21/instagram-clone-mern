import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOGOUT_REQUEST } from "../constants/authConstants";
//import { GET_OWN_PROFILE_REQUEST,GET_OWN_PROFILE_SUCCESS,GET_OWN_PROFILE_FAILED } from "../constants/ownProfileConstants";
import { UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_FAILED, UPDATE_PROFILE_SUCCESS } from "../constants/profileConstants";
export const authReducer=(state={user:{},isAuthenticated:false},action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        return{
            loading:true,
            isAuthenticated:false,
        }
        case UPDATE_PROFILE_REQUEST:
            return{
                    loading:true
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload
            }
            case LOGOUT_REQUEST:
                return{
                    loading:true
                }
        case LOGOUT_SUCCESS:
            return{
                loading:true,
                user:null,
                isAuthenticated:false,
            }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return{
                ...state,
                loading:false,
                user:null,
                error:action.payload,
            }
        case UPDATE_PROFILE_FAILED:
        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}

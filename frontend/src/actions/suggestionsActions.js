import {GET_SUGGESTIONS_REQUEST,GET_SUGGESTIONS_SUCCESS,GET_SUGGESTIONS_FAILED} from "../constants/suggestionsConstants"
import axios from "axios";

export const getSuggestions=(userid)=>async(dispatch)=>{
    try{
        dispatch({type:GET_SUGGESTIONS_REQUEST});
        const {data}=await axios({
            method:'POST',
            url:`http://localhost:7000/api/v1/suggestions/${userid}`,
            withCredentials:true,
        })
        dispatch({type:GET_SUGGESTIONS_SUCCESS,payload:data.suggestions})
    }catch(err){
        dispatch({type:GET_SUGGESTIONS_FAILED,payload:err})
    }
}

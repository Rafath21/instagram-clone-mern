import {GET_SUGGESTIONS_REQUEST,GET_SUGGESTIONS_SUCCESS,GET_SUGGESTIONS_FAILED} from "../constants/suggestionsConstants"
export const getSuggestionsReducer=(state={allSuggestions:[]},action)=>{
    switch(action.type){
        case GET_SUGGESTIONS_REQUEST:
            return{
                loading:true,
                allSuggestions:[]
            }
        case GET_SUGGESTIONS_SUCCESS:
            return{
                loading:false,
                allSuggestions:action.payload
            }
        
        case GET_SUGGESTIONS_FAILED:
            return{
                loading:false,
                error:action.payload
            }
        
         default:
             return state;
    }
}
import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { getPostsFeedReducer,getReelsFeedReducer, getActivityFeedReducer,getRequestsFeedReducer,getStoriesFeedReducer } from "./reducers/feedReducers";
import { getProfileReducer, updateProfileReducer } from "./reducers/profileReducers";
import { acceptRequestReducer, deleteRequestReducer } from "./reducers/requestsReducers";
import { updateCommentsReducer, updateLikesReducer } from "./reducers/postReducers";


const reducer=combineReducers({
    feedPosts:getPostsFeedReducer,
    feedReels:getReelsFeedReducer,
    feedActivity:getActivityFeedReducer,
    feedRequests:getRequestsFeedReducer,
    feedStories:getStoriesFeedReducer,
    profile:getProfileReducer,
    isProfileUpdated:updateProfileReducer,
    isRequestAccepted:acceptRequestReducer,
    isRequestDeleted:deleteRequestReducer,
    isLikeUpdated:updateLikesReducer,
    isCommentUpdated:updateCommentsReducer
});

let initialState={};
const middleware=[thunk];

const store=createStore(
    reducer,initialState,composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
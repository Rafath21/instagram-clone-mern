import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { getPostsFeedReducer,getReelsFeedReducer, getActivityFeedReducer,getRequestsFeedReducer,getStoriesFeedReducer } from "./reducers/feedReducers";
import { getProfileReducer, updateProfileReducer } from "./reducers/profileReducers";
import { acceptRequestReducer, deleteActivityReducer, deleteRequestReducer, sendRequestReducer } from "./reducers/requestsReducers";
import { createPostReducer, updateCommentsReducer, updateLikesReducer } from "./reducers/postReducers";
import { createReelReducer, updateReelCommentsReducer, updateReelLikesReducer } from "./reducers/reelReducers";
import { createStoryReducer, getOwnStoryReducer } from "./reducers/storyReducers";
import { authReducer } from "./reducers/authReducers";
import { getSuggestionsReducer } from "./reducers/suggestionsReducers";
import { allUsersReducer } from "./reducers/allUsersReducer";
const reducer=combineReducers({
    user:authReducer,
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
    isCommentUpdated:updateCommentsReducer,
    isPostCreated:createPostReducer,
    isActivityDeleted:deleteActivityReducer,
    isReelLikeUpdated:updateReelLikesReducer,
    isReelCommentUpdated:updateReelCommentsReducer,
    isReelCreated:createReelReducer,
    isStoryCreated:createStoryReducer,
    ownStories:getOwnStoryReducer,
    allSuggestions:getSuggestionsReducer,
    followStatus:sendRequestReducer,
    allUsers:allUsersReducer
});

let initialState={};
const middleware=[thunk];

const store=createStore(
    reducer,initialState,composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
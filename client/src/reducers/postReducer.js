import { 
   POST_LOADING, POST_REQUEST, POST_SUCCESS, POST_ERROR, GET_POSTS
} from '../actions/types';

const initialState = {
   isPosting: false,
   isFetching: false,
   posts: [],
   post: {},
   errors: {}
};

export default (state = initialState, action) => {
   switch (action.type) {

      case POST_LOADING:
         return {
            ...state,
            isFetching: true
         };
      
      case GET_POSTS:
         return {
            ...state,
            isFetching: false,
            posts: action.payload
         };

      case POST_REQUEST:
         return {
            ...state,
            isPosting: true,
            errors: {}
         };
      
      case POST_ERROR:
         return {
            ...state,
            isPosting: false,
            errors: action.payload
         };

      case POST_SUCCESS:
         return {
            ...state,
            isPosting: false,
            errors: {},
            posts: [action.payload, ...state.posts]
         };

      default:
         return state;
   }
};

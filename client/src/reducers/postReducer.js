import { 
   POST_LOADING, POST_REQUEST, POST_SUCCESS, POST_ERROR, GET_POSTS, GET_POST, GET_USER_POST, GET_LIKE_UNLIKE_POST, DELETE_POST
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
      
      case GET_POST:
         return {
            ...state,
            posts: action.payload,
            isFetching: false
         };
      
      case GET_USER_POST:
         return {
            ...state,
            isFetching: false,
            posts: action.payload
         };
      
      case GET_LIKE_UNLIKE_POST:
         return {
            ...state,            
            posts: {
               ...state.posts,
               docs: state.posts.docs.map(post => {
                  return post = post._id === action.payload._id ? action.payload : post;
               })
            }
         };

      case DELETE_POST:
         return {
            ...state,
            posts: {
               ...state.posts,
               docs: state.posts.docs.filter(post => post._id !== action.payload)
            }
         }

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
            posts: {
               ...state.posts,
               docs: [action.payload, ...state.posts.docs]
            }
         };

      default:
         return state;
   }
};

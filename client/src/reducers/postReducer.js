import { 
   POST_LOADING, POST_REQUEST, POST_SUCCESS, POST_ERROR, GET_POSTS, GET_POST, GET_USER_POST, GET_UPDATED_POST, DELETE_POST, LOAD_MORE
} from '../actions/types';

const initialState = {
   isPosting: false,
   isFetching: false,
   loadMore: false,
   posts: {
      docs: []
   },
   post: {},
   errors: {}
};

export default (state = initialState, action) => {
   switch (action.type) {

      case POST_LOADING:
         return {
            ...state,
            isFetching: true,
            posts: {
               docs: []
            }
         };
      
      case LOAD_MORE:
         return {
            ...state,
            loadMore: true
         };
      
      case GET_POSTS:
         return {
            ...state,
            isFetching: false,
            loadMore: false,
            posts: { 
               ...state.posts,
               ...action.payload,
               docs: state.posts.docs.concat(action.payload.docs)
            }
         };
      
      case GET_POST:
         return {
            ...state,
            post: action.payload,
            isFetching: false
         };
      
      case GET_USER_POST:
         return {
            ...state,
            isFetching: false,
            posts: action.payload
         };
      
      case GET_UPDATED_POST:
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
         };

      // case UPDATE_POST:
      //    return {
      //       ...state,
      //       posts: {
      //          ...state.posts,
      //          // docs: TODO
      //       }
      //    }

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

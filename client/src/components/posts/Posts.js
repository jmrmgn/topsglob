import React, { Component } from 'react';
import PostForm from './PostForm';

class Posts extends Component {
   render() {
      return (
         <div className="block">
            <div className="columns">
               <div className="column is-8 is-offset-2">
                  <PostForm />
               </div>
            </div>
         </div>
      )
   }
}

export default Posts;

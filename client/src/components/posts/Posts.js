import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostForm from './PostForm';
import PostMain from './PostMain';
import PostContentLoader from '../common/PostsContentLoader';

import { connect } from 'react-redux';

class Posts extends Component {
   render() {
      const { isAuthenticated } = this.props.auth;
      const { isPosting } = this.props.post;

      return (
         <div className="block">
            <div className="columns">
               <div className="column is-8 is-offset-2">
                  { isAuthenticated && <PostForm /> }
                  {isPosting && <PostContentLoader />}
                  <PostMain />
               </div>
            </div>
         </div>
      )
   }
}

Posts.propTypes = {
   auth: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth,
   post: state.post
});

export default connect(mapStateToProps)(Posts);
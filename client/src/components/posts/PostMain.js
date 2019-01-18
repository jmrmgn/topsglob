import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostItem from './PostItem';
import PostContentLoader from '../common/PostsContentLoader';

import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';

class PostMain extends Component {

   componentDidMount() {
      this.props.getPosts();
   }

   render() {
      const { isFetching } = this.props.post;
      const { docs } = this.props.post.posts;

      const allPosts = (!isFetching)
      ?
         (docs)
            ? docs.map((post, index) => {
               return(
                  <PostItem key={index}
                     user={post.user}
                     content={post.content}
                     created={post.createdAt}
                  />
               );
            })
            : <h1>No posts</h1>
      : <React.Fragment>
         <PostContentLoader />
         <PostContentLoader />
         <PostContentLoader />
         </React.Fragment>
      ;

      return (         
         <div>
            {allPosts}
         </div>
      )
   }
}

PostMain.propTypes = {
   auth: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired,
   getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth,
   post: state.post
});

export default connect(mapStateToProps, { getPosts })(PostMain);

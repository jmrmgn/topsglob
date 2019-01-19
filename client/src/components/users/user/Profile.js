import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Information from './Information';
import PostItem from '../../posts/PostItem';
import PostContentLoader from '../../common/PostsContentLoader';

import { connect } from 'react-redux';
import { getCurrentPosts } from '../../../actions/postActions';

class Profile extends Component {
   componentDidMount() {
      const { id } = this.props.auth.user;
      this.props.getCurrentPosts(id);
   }

   render() {
      const { user } = this.props.auth;
      const { isFetching } = this.props.post;
      const { docs } = this.props.post.posts;

      const allPosts = (!isFetching)
      ?
         (docs)
            && docs.length > 0
               ? docs.map((post, index) => {
                     return(
                        <PostItem key={index}
                           post={post}
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
         <div className="tile is-ancestor">
            <div className="tile is-4 is-vertical is-parent">
               <div className="tile is-child">
                  <Information
                     user={user}
                  />
               </div>
            </div>
            <div className="tile is-parent">
               <div className="tile is-child">
                  <h1 className="title">Posts</h1>
                  {allPosts}
               </div>
            </div>
         </div>
      )
   }
}

Profile.propTypes = {
   auth: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired,
   getCurrentPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth,
   post: state.post
});

export default connect(mapStateToProps, { getCurrentPosts })(Profile);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/isEmpty';

import InformationItem from './user/InformationItem';
import PostItem from '../posts/PostItem';
import PostContentLoader from '../common/PostsContentLoader';
import InformationContentLoader from '../common/InformationContentLoader';

import { connect } from 'react-redux';
import { getUser } from '../../actions/userActions';
import { getCurrentPosts } from '../../actions/postActions';

class UserProfile extends Component {

   state = {
      errors: ''
   };
   
   async componentDidMount() {
      if (this.props.match.params.userId) {
         await this.props.getUser(this.props.match.params.userId);
         await this.props.getCurrentPosts(this.props.match.params.userId);
      }

      const { user, errors } = this.props.user;
      if (isEmpty(user) || !isEmpty(errors)) {
         this.setState({ errors });
      }
   }

   render() {
      const { user } = this.props.user;
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

      const information = <InformationItem user={user} fieldBio={user.bio} />

      const profile = (
         <div className="tile is-ancestor">
            <div className="tile is-4 is-vertical is-parent">
               <div className="tile is-child">
                  {
                     (this.props.user.isFetching)
                     ? <InformationContentLoader />
                     : information
                  }
               </div>
            </div>
            <div className="tile is-parent">
               <div className="tile is-child">
                  <h1 className="title">Posts</h1>
                  {allPosts}
               </div>
            </div>
         </div>
      );

      return (
         <React.Fragment>
            {profile}
         </React.Fragment>
      )
   }
}

UserProfile.propTypes = {
   post: PropTypes.object.isRequired,
   user: PropTypes.object.isRequired,
   getUser: PropTypes.func.isRequired,
   getCurrentPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   post: state.post,
   user: state.user
});

export default connect(mapStateToProps, { getUser, getCurrentPosts })(UserProfile);

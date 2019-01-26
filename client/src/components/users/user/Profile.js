import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Information from './Information';
import PostItem from '../../posts/PostItem';
import PostEditForm from '../../posts/PostEditForm';
import PostContentLoader from '../../common/PostsContentLoader';
import Modal from '../../common/Modal';

import { connect } from 'react-redux';
import { getCurrentPosts, getPost } from '../../../actions/postActions';
import { showModal, hideModal } from '../../../actions/modalActions';

class Profile extends Component {
   componentDidMount() {
      const { id } = this.props.auth.user;
      this.props.getCurrentPosts(id);
   }

   onCloseModal = () => { this.props.hideModal(); }

   onShowModal = async id => {
      await this.props.getPost(id);
      await this.props.showModal();
   };

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
                           onEdit={this.onShowModal.bind(this, post._id)}
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
                  {
                     this.props.modal.modalStatus &&
                     <Modal
                        onOpen={this.props.modal.modalStatus}
                        onClose={this.onCloseModal}
                        modalTitle="Update post"
                        modalContent={
                           <PostEditForm/>
                        }
                     />
                  }
               </div>
            </div>
         </div>
      )
   }
}

Profile.propTypes = {
   auth: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired,
   getCurrentPosts: PropTypes.func.isRequired,
   showModal: PropTypes.func.isRequired,
   hideModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
   auth: state.auth,
   post: state.post,
   modal: state.modal
});

export default connect(mapStateToProps, { getCurrentPosts, getPost, showModal, hideModal })(Profile);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostItem from './PostItem';
import PostEditForm from './PostEditForm';
import PostContentLoader from '../common/PostsContentLoader';
import Modal from '../common/Modal';

import { connect } from 'react-redux';
import { getPosts, getPost } from '../../actions/postActions';
import { showModal, hideModal } from '../../actions/modalActions';

class PostMain extends Component {

   componentDidMount() {
      this.loadPosts();
      window.addEventListener('scroll', this.handleScroll);
   }

   handleScroll = () => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      
      const { page, pages } = this.props.post.posts;

      if (windowBottom >= docHeight) {
         if (page < pages) {
            this.loadMore();
         }
      }
   }

   loadPosts = () => {
      this.props.getPosts();
   }

   loadMore = () => {
      const { limit, page } = this.props.post.posts;
      this.props.getPosts(limit, page + 1);
   }

   onCloseModal = () => { this.props.hideModal(); }

   onShowModal = async id => {
      await this.props.getPost(id);
      await this.props.showModal();
   };

   render() {
      const { isFetching } = this.props.post;
      const { docs } = this.props.post.posts;

      const allPosts = (!isFetching)
      ?
         (docs.length !== 0)
            ? docs.map((post, index) => {
               return(
                  <PostItem key={index}
                     post={post}
                     onEdit={this.onShowModal.bind(this, post._id)}
                  />
               );
            })
            : <h1 className="m-t-md">No posts</h1>
      : <React.Fragment>
         <PostContentLoader />
         <PostContentLoader />
         </React.Fragment>
      ;

      return (     
         <div>
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
      )
   }
}

PostMain.propTypes = {
   auth: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired,
   modal: PropTypes.object.isRequired,
   getPosts: PropTypes.func.isRequired,
   showModal: PropTypes.func.isRequired,
   hideModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth,
   post: state.post,
   modal: state.modal
});

export default connect(mapStateToProps, { getPosts, getPost, showModal, hideModal })(PostMain);

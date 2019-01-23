import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { connect } from 'react-redux';
import { likePost, unlikePost, deletePost } from '../../actions/postActions';

class PostItem extends Component {
   onLike = id => {
      this.props.likePost(id);
   }

   onUnlike = id => {
      this.props.unlikePost(id);
   }

   findUserLike = likes => {
      const { user } = this.props.auth;
      return (likes.filter(like => like.user === user.id).length > 0 ? true: false);
   }

   onDelete = id => {
      confirmAlert({
         title: 'Confirm to submit',
         message: 'Are you sure to do this.',
         buttons: [
            {
               label: 'Yes',
               onClick: () => {
                  this.props.deletePost(id);
               }
            },
            {
               label: 'No',
            }
         ]
       })
   }

   render() {
      const { post } = this.props;
      const { user } = this.props.auth;

      return (
         <div className="block m-t-md">
            <div className="box">
               <article className="media">
                  <div className="media-left">
                     <figure className="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt="" />
                     </figure>
                  </div>
                  <div className="media-content">
                     <div className="content">
                        <p>
                           <strong>{post.user.username}</strong> <small>{post.user.email}</small>
                           <br />
                           <label className="is-size-6">{post.createdAt}</label>
                           <br/>
                           {post.content}
                        </p>
                     </div>
                     <nav className="level is-mobile">
                        <div className="level-left">
                           <div
                              href="/"
                              className={classnames('button is-small like-button', { 'unlike-button': this.findUserLike(post.likes) })}
                              onClick={
                                 (!this.findUserLike(post.likes))
                                    ? this.onLike.bind(this, post._id)
                                    : this.onUnlike.bind(this, post._id)
                              }
                           >
                              <span className="icon is-small">
                                 <i className="fas fa-thumbs-up"></i>
                              </span>
                              <span>
                                 {post.likes && (post.likes.length > 0) ? post.likes.length : null } 
                              </span>
                           </div>
                        </div>
                     </nav>
                  </div>
                  {
                     (user.id === post.user._id)
                        ?
                        <React.Fragment>
                           <a href="/edit" title="Edit">
                              <i className="fas fa-pencil-alt"></i>
                           </a>
                           <div
                              className="m-l-sm"
                              title="Delete"
                              style={{ cursor: 'pointer' }}
                              onClick={this.onDelete.bind(this, post._id)}
                           >
                              <i className="fas fa-trash has-text-danger"></i>
                           </div>
                        </React.Fragment>
                        : null
                  }
                     
               </article>
            </div>
         </div>
      );
   }
};

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   likePost: PropTypes.func.isRequired,
   unlikePost: PropTypes.func.isRequired,
   deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(PostItem);
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../actions/postActions';

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

   render() {
      const { post } = this.props;

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
               </article>
            </div>
         </div>
      );
   }
};

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   likePost: PropTypes.func.isRequired,
   unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, { likePost, unlikePost })(PostItem);
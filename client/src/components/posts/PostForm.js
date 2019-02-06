import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/isEmpty';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
   state = {
      content: '',
      errors: {}
   };

   componentWillReceiveProps(nextProps) {
      if (nextProps.post.errors) {
         this.setState({
            errors: nextProps.post.errors
         });
      }
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   }

   onSubmit = async e => {
      e.preventDefault();

      const { id } = this.props.auth.user;
      const { content } = this.state;
      const newPost = {
         user: id,
         content: content
      };

      await this.props.addPost(newPost);

      if (isEmpty(this.state.errors)) {
         this.setState({ content: '' });
      }
      
   }

   render() {
      const { errors, content } = this.state;
      const { isPosting } = this.props.post;

      return (
         <div className="postform">
            <div className="card m-t-sm p-md">
               <label htmlFor="content" className="card-header is-4">What's new</label>
               <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this)}>                    
                     <TextAreaFieldGroup
                        name="content"
                        placeholder="Say something..."
                        onChange={this.onChange.bind(this)}
                        error={errors.content}
                        value={content}
                     />
                     <div className="field m-t-sm">
                        <div className="control">
                           <button
                              className={classnames('button is-info', {'is-loading': isPosting})}
                              disabled={(isEmpty(content) || content.length <= 9) ? true : false}
                           >Create Post</button>
                        </div>
                     </div>
                  </form>
               </div>      
            </div>
         </div>
      )
   }
}

PostForm.propTypes = {
   auth: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired,
   addPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth,
   post: state.post
});

export default connect(mapStateToProps, { addPost })(PostForm);

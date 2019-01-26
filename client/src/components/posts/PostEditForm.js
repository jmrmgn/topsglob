import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import isEmpty from '../../validation/isEmpty';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import { connect } from 'react-redux';
import { updatePost } from '../../actions/postActions';

class PostEditForm extends Component {
   state = {
      content: '',
      errors: {},
   };

   componentDidMount() {
      this.setState({
         content: this.props.post.post.content
      });
   }

   onChange = e => this.setState({ [e.target.name]: e.target.value });

   onSubmit = e => {
      e.preventDefault();
      const { content } = this.state;
      const { _id } = this.props.post.post;
      this.props.updatePost({ content }, _id);
   };

   render() {
      const { content, errors } = this.state;
      const { isPosting, isFetching } = this.props.post;
      
      return (
         (isFetching)
            ? ('Loading....')
            : <div className="postform">
                  <div className="card m-t-sm p-md">
                     <div className="card-body">
                        <form onSubmit={this.onSubmit}>                    
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
                                 >Save changes</button>
                              </div>
                           </div>
                        </form>
                     </div>      
                  </div>
               </div>
      );
   }
}

PostEditForm.propTypes = {
   post: PropTypes.object.isRequired,
   updatePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   post: state.post
});

export default connect(mapStateToProps, { updatePost })(PostEditForm);

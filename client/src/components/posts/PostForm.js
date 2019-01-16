import React, { Component } from 'react';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import { connect } from 'react-redux';

class PostForm extends Component {
   state = {
      content: '',
      errors: {}
   };

   onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   }

   onSubmit = e => {
      e.preventDefault();

      const { id } = this.props.auth.user;
      const { content } = this.state;
      // TODO CREATE POST
   }

   render() {
      const { errors } = this.state;
      return (
         <div className="postform">
            <label htmlFor="content" className="title is-4">What's new</label>
            <div className="card m-t-sm p-md">
               <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this)}>                    
                     <TextAreaFieldGroup
                        name="content"
                        placeholder="Say something..."
                        onChange={this.onChange.bind(this)}
                        error={errors.content}
                     />
                     <div className="field m-t-sm">
                        <div className="control">
                           <button className="button is-info">Create Post</button>
                        </div>
                     </div>
                  </form>
               </div>      
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, {})(PostForm);

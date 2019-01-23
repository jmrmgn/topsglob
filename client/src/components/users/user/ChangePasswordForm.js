import React, { Component } from 'react';
import classnames from 'classnames';

import TextFieldGroup from '../../common/TextFieldGroup';

class ChangePasswordForm extends Component {

   state = {
      currentPassword: '',
      newPassword: '',
      newPassword2: '',
      errors: {}
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   onSubmit = e => {
      e.preventDefault();
      // TODO change password
      
   }

   render() {
      const { errors } = this.state;

      return (
         <div className="block">
            <div className="columns">
               <div className="column is-4 is-offset-4">
                  <h1 className="title has-text-centered">Change password</h1>
                  <form onSubmit={this.onSubmit.bind(this)}>
                     <TextFieldGroup
                        type="password"
                        label="Current password"
                        name="currentPassword"
                        placeholder="Enter current password"
                        onChange={this.onChange.bind(this)}
                        icon={"fas fa-lock"}
                        error={errors.currentPassword}
                     />
                     <TextFieldGroup
                        type="password"
                        label="New Password"
                        name="newPassword"
                        placeholder="Enter new password"
                        onChange={this.onChange.bind(this)}
                        icon={"fas fa-lock"}
                        error={errors.newPassword}
                     />
                     <TextFieldGroup
                        type="password"
                        label="Confirm password"
                        name="newPassword2"
                        placeholder="Enter confirm password"
                        onChange={this.onChange.bind(this)}
                        icon={"fas fa-lock"}
                        error={errors.newPassword2}
                     />
                     <div className="field" style={{ marginTop: 30 }}>
                        <div className="control">
                           <button
                              type="submit"
                              className={classnames('button is-success is-fullwidth')}
                           >
                              Update password
                           </button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      )
   }
}

export default ChangePasswordForm;

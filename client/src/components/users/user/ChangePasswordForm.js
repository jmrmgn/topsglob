import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TextFieldGroup from '../../common/TextFieldGroup';

import { connect } from 'react-redux';
import { changePassword } from '../../../actions/authActions';

class ChangePasswordForm extends Component {

   state = {
      currentPassword: '',
      newPassword: '',
      newPassword2: '',
      errors: {}
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.auth.errors) {
         this.setState({ errors: nextProps.auth.errors });
      }
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   onSubmit = e => {
      e.preventDefault();
      const { currentPassword, newPassword, newPassword2 } = this.state;
      const newData = {currentPassword, newPassword, newPassword2};

      this.props.changePassword(newData, this.props.history);
   }

   render() {
      const { errors } = this.state;
      const { isPosting } = this.props.auth;

      return (
         <div className="block">
            <div className="columns">
               <div className="column is-4 is-offset-4">
                  <h1 className="title has-text-centered">Change password</h1>
                  <form onSubmit={this.onSubmit}>
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
                              className={classnames('button is-success is-fullwidth', { 'is-loading': isPosting })}
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

ChangePasswordForm.propTypes = {
   auth: PropTypes.object.isRequired,
   changePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, { changePassword })( withRouter(ChangePasswordForm) );

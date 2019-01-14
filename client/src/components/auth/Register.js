import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { postRegister } from '../../actions/authActions';

import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {

   state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
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
      const { username, email, password, confirmPassword } = this.state;
      const newUser = { username, email, password, confirmPassword };

      this.props.postRegister(newUser, this.props.history);
   }

   render() {
      const { errors } = this.state;
      return (
         <div className="block">
            <div className="columns">
               <div className="column is-4 is-offset-4">
                  <h1 className="title has-text-centered">Register new user</h1>
                  <form onSubmit={this.onSubmit.bind(this)}>                           
                     <TextFieldGroup
                        label="Username"
                        name="username"
                        placeholder="Enter username"
                        onChange={this.onChange.bind(this)}
                        error={errors}
                     />
                     <TextFieldGroup
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Enter email"
                        onChange={this.onChange.bind(this)}
                        error={errors}
                     />
                     <TextFieldGroup
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Enter password"
                        onChange={this.onChange.bind(this)}
                        error={errors}
                     />
                     <TextFieldGroup
                        type="password"
                        label="Confirm password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={this.onChange.bind(this)}
                        error={errors}
                     />
                     <div className="field" style={{ marginTop: 30 }}>
                        <div className="control">
                           <button className="button is-primary is-fullwidth" type="submit">Register</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      )
   }
}

Register.propTypes = {
   postRegister: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, { postRegister })(Register);
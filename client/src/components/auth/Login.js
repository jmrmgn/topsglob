import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { postLogin } from '../../actions/authActions';

import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {

   state = {
      username: '',
      password: '',
      errors: {}
   };

   componentDidMount() {
      const { isAuthenticated } = this.props.auth;
      if (isAuthenticated) {
         this.props.history.push('/');
      }
   }
   
   componentWillReceiveProps(nextProps) {
      if (nextProps.auth.errors) {
         this.setState({ errors: nextProps.auth.errors });
      }
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   }

   onSubmit = e => {
      e.preventDefault();
      
      const { username, password } = this.state;
      const userData = { username, password };
      this.props.postLogin(userData, this.props.history);
   }

   render() {
      const { errors } = this.state;
      const { isPosting } = this.props.auth;

      return (
         <div className="block">
            <div className="columns">
               <div className="column is-4 is-offset-4">
                  <h1 className="title has-text-centered">Account login</h1>
                  <form onSubmit={this.onSubmit.bind(this)}>
                     <TextFieldGroup
                        label="Username"
                        name="username"
                        placeholder="Enter username"
                        onChange={this.onChange.bind(this)}
                        icon={"fas fa-user"}
                        error={errors.username}
                     />
                     <TextFieldGroup
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Enter password"
                        onChange={this.onChange.bind(this)}
                        icon={"fas fa-lock"}
                        error={errors.password}
                     />
                     <div className="field" style={{ marginTop: 30 }}>
                        <div className="control">
                           <button
                              type="submit"
                              className={classnames('button is-info is-fullwidth', { 'is-loading': isPosting })}
                           >
                              Login
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

Login.propTypes = {
   auth: PropTypes.object.isRequired,
   postLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, { postLogin })(Login);

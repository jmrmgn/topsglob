import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {

   state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   onSubmit = e => {
      e.preventDefault();
   }

   render() {
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
                     />
                     <TextFieldGroup
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Enter email"
                        onChange={this.onChange.bind(this)}
                     />
                     <TextFieldGroup
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Enter password"
                        onChange={this.onChange.bind(this)}
                     />
                     <TextFieldGroup
                        type="password"
                        label="Confirm password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={this.onChange.bind(this)}
                     />
                     <div className="field" style={{ marginTop: 30 }}>
                        <div className="control">
                           <button className="button is-primary is-fullwidth">Register</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      )
   }
}

export default Register;

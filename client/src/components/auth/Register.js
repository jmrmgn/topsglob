import React, { Component } from 'react';

class Register extends Component {
   onSubmit = e => {
      e.preventDefault();
   }

   render() {
      return (
         <div className="block">
            <div className="columns">
               <div className="column is-8 is-offset-2">
                  <h1 className="title has-text-centered">Register new user</h1>
                  <div className="columns">
                     <div className="column is-6 is-offset-3">
                        <form onSubmit={this.onSubmit.bind(this)}>
                           <div className="field">
                              <label htmlFor="username">Username</label>
                              <div className="control">
                                 <input type="text" className="input" placeholder="Enter username" />
                              </div>
                              <p className="help">This is a help text</p>
                           </div>
                           
                           <div className="field">
                              <label htmlFor="email">Email</label>
                              <div className="control">
                                 <input type="email" className="input" placeholder="Enter email" />
                              </div>
                              <p className="help">This is a help text</p>
                           </div>
                           <div className="field">
                              <label htmlFor="password">Password</label>
                              <div className="control">
                                 <input type="password" className="input" placeholder="Enter password" />
                              </div>
                              <p className="help">This is a help text</p>
                           </div>
                           <div className="field">
                              <label htmlFor="confirmPassword">Confirm Password</label>
                              <div className="control">
                                 <input type="password" className="input" placeholder="Confirm password" />
                              </div>
                              <p className="help">This is a help text</p>
                           </div>
                           <div className="field" style={{ marginTop: 30 }}>
                              <div className="control">
                                 <button className="button is-primary is-fullwidth">Register</button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
            </div>
      )
   }
}

export default Register;

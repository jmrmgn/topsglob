import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Information extends Component {
   render() {
      const { user } = this.props;
      return (
         <div className="card">
            <header className="card-header">
               <p className="card-header-title">
                  Information
               </p>
            </header>
            <div className="card-content">
               <div className="content content-info">
                  <div className="level">
                     <div className="level-item has-text-centered">
                        <figure className="image is-96x96">
                           <img src="https://bulma.io/images/placeholders/96x96.png" alt="" />
                        </figure>
                     </div>
                  </div>
                  <div className="has-text-centered">
                     <label htmlFor="username" className="title is-size-4">{user.username}</label>
                     <br/>
                     <label htmlFor="email" className="subtitle">{user.email}</label>
                  </div>
                  <div className="has-text-centered m-t-sm">
                     {user.bio ? user.bio : "No bio yet."}
                  </div>
                  <br/>
                  <small>Joined since: {user.createdAt}</small>
               </div>
            </div>
            <footer className="card-footer">
               <Link to="/edit/profile" className="card-footer-item">Edit</Link>
            </footer>
         </div>
      )
   }
}

export default Information;

import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = props => {
   const { _id, username, email, bio, createdAt } = props.user;

   return (
      <React.Fragment>
         <div className="card">
            <div className="card-content card-user">
               <div className="media">
                  <div className="media-left">
                     <figure className="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt={username} />
                     </figure>
                  </div>
                  <div className="media-content">
                     <p className="title is-4">{username}</p>
                     <p className="subtitle is-size-7">{email}</p>
                  </div>
               </div>

               <div className="content">
                  <br />
                  <p className="is-size-6">
                     {bio ? bio : <span className="has-text-centered">No bio yet.</span>}
                  </p>
               </div>
            </div>
            <div className="card-footer">
               <Link to={`/users/${_id}`} className="button is-light is-fullwidth has-text-centered has-text-info">
                  View profile
               </Link>
            </div>
         </div>
      </React.Fragment>
   );
};

export default UserItem;

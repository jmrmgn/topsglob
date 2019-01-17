import React from 'react';
import PropTypes from 'prop-types';

const PostItem = props => {
   const { user, content, created } = props;

   return (
      <div className="block m-t-md">
         <div className="box">
            <article className="media">
               <div className="media-left">
                  <figure className="image is-64x64">
                     <img src="https://bulma.io/images/placeholders/128x128.png" alt="" />
                  </figure>
               </div>
               <div className="media-content">
                  <div className="content">
                     <p>
                        <strong>{user.username}</strong> <small>{user.email}</small>
                        <br />
                        <label className="is-size-6">{created}</label>
                        <br/>
                        {content}
                     </p>
                  </div>
                  <nav className="level is-mobile">
                     <div className="level-left">
                        <a className="level-item" aria-label="reply" onClick={e => e.preventDefault()}>
                           <span className="icon is-small">
                              <i className="fas fa-thumbs-up"></i>
                           </span>
                        </a>                                              
                     </div>
                  </nav>
               </div>
            </article>
         </div>
      </div>
   );
};

export default PostItem;
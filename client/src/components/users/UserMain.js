import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserItem from './UserItem';

class UserMain extends Component {
   render() {
      const { users } = this.props;
      
      const allUsers = (users.length > 0) 
            ? users.map((user, index) => {
               return (
                  <div className="column is-3" key={index}>
                     <UserItem
                        user={user}
                     />
                  </div>
               );
            })
            : (<h1>Loading...</h1>)
      return (
         <div className="columns is-multiline">
            {allUsers}
         </div>
      )
   }
}


UserMain.propTypes = {
   users: PropTypes.array.isRequired
};

export default UserMain;
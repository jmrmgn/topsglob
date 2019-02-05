import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserItem from './UserItem';

class UserMain extends Component {
   render() {
      const { users, isFetching } = this.props;
      
      const allUsers = 
         (isFetching)
            ? <h1>Loading...</h1>
            : (users.length > 0) 
               ? users.map((user, index) => {
                  return (
                     <div className="column is-3" key={index}>
                        <UserItem
                           user={user}
                        />
                     </div>
                  );
               })
               : (<h1>No users yet.</h1>)
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
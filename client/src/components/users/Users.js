import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserMain from './UserMain';

import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions';

class Users extends Component {

   componentDidMount() {
      this.props.getUsers();
   }

   render() {
      const { users, isFetching } = this.props.user;

      return (
         <div>
            <UserMain
               users={users}
               isFetching={isFetching}
            />
         </div>
      )
   }
}

Users.propTypes = {
   getUsers: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   user: state.user,
});

export default connect(mapStateToProps, {getUsers})(Users);
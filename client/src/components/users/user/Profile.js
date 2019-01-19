import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Information from './Information';

import { connect } from 'react-redux';
import {} from '../../../actions/authActions';

class Profile extends Component {
   render() {
      const { user } = this.props.auth;
      return (
         <div className="tile is-ancestor">
            <div className="tile is-4 is-vertical is-parent">
               <div className="tile is-child">
                  <Information
                     user={user}
                  />
               </div>               
            </div>
            <div className="tile is-parent">
               ...Posts here
            </div>
         </div>
      )
   }
}

Profile.propTypes = {
   auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, {})(Profile);

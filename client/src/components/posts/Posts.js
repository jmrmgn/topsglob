import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostForm from './PostForm';
import PostMain from './PostMain';

import { connect } from 'react-redux';

class Posts extends Component {
   render() {
      const { isAuthenticated } = this.props.auth;

      return (
         <div className="block">
            <div className="columns">
               <div className="column is-8 is-offset-2">
                  { isAuthenticated && <PostForm /> }
                  <PostMain />
               </div>
            </div>
         </div>
      )
   }
}

Posts.propTypes = {
   auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps)(Posts);
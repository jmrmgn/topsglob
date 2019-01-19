import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';

import { connect } from 'react-redux';
import { updateUserProfile } from '../../../actions/authActions';

class Information extends Component {
   state = {
      bio: '',
      onEdit: false,
      errors: {}
   };

   componentWillReceiveProps(nextProps) {
      if (nextProps.auth.errors) {
         this.setState({ errors: nextProps.auth.errors });
      }
   }

   componentDidMount() {
      const { bio } = this.props.auth.user;
      this.setState({
         bio: bio
      })
   }

   onEdit = () => {
      this.setState({
         onEdit: true
      });
   };

   onSave = async () => {
      const { bio } = this.state;
      const newBio = {bio};
      await this.props.updateUserProfile(newBio);
      
      this.setState({
         onEdit: false,
      });
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   render() {
      const { user } = this.props;
      const { isPosting } = this.props.auth;
      const { onEdit, bio, errors } = this.state;

      const fieldBio = (onEdit)
         ? (
            <TextAreaFieldGroup
               name="bio"
               onChange={this.onChange.bind(this)}
               value={bio}
               error={errors.bio}
            />
         )
         : (bio)
            ? bio
            : "No bio yet.";

      const buttonState = onEdit 
            ? <div
                  className="card-footer-item has-text-info"
                  style={{ cursor: 'pointer' }}
                  onClick={this.onSave.bind(this)}
               >
                  {
                     (isPosting)
                        ? <i className="fas fa-spinner fa-spin"></i>
                        : ('Save')
                  }
               </div>
            :  <div
                  className="card-footer-item has-text-info"
                  style={{ cursor: 'pointer' }}
                  onClick={this.onEdit.bind(this)}
               >
                  Edit
               </div>
      

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
                     {fieldBio}
                  </div>
                  <br/>
                  <small>Joined since: {user.createdAt}</small>
               </div>
            </div>
            <footer className="card-footer">
               {buttonState}
            </footer>
         </div>
      )
   }
}

Information.propTypes = {
   user: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   updateUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, { updateUserProfile })(Information);

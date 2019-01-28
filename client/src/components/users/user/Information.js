import React, { Component } from 'react';
import PropTypes from 'prop-types';

import isEmpty from '../../../validation/isEmpty';

import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import InformationItem from './InformationItem';

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
      
      if (isEmpty(this.state.errors)) {
         this.setState({
            onEdit: false,
         });
      }
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

      const buttonState =  onEdit 
            ? 
               <footer className="card-footer">
                  <div
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
               </footer>
            :  
               <footer className="card-footer">
                  <div
                     className="card-footer-item has-text-info"
                     style={{ cursor: 'pointer' }}
                     onClick={this.onEdit.bind(this)}
                  >
                     Edit
                  </div>
               </footer>;
      

      return (
         <InformationItem
            user={user}
            fieldBio={fieldBio}
            buttonState={buttonState}
         />
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

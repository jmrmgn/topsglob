import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = props => {
   const { label, type, name, placeholder, value, icon, error, onChange } = props;

   return (
      <div className="field">
         <label htmlFor={name}>{label}</label>
         <p className="control has-icons-left">
            <input
               type={type}
               name={name}
               className={classnames('input', { 'is-danger': error })}
               placeholder={placeholder}
               onChange={onChange}
               value={value}
            />
            <span className="icon is-small is-left">
               <i className={icon}></i>
            </span>
         </p>
         {error ? <p className="help has-text-danger">{error}</p> : null}
      </div>
      
   );
};

TextFieldGroup.propTypes = {
   label: PropTypes.string,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   placeholder: PropTypes.string,
   value: PropTypes.string,
   icon: PropTypes.string,
   error: PropTypes.string,
   onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
   type: 'text'
};


export default TextFieldGroup;
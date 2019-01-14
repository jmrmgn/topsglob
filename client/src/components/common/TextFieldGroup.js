import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = props => {
   const { label, type, name, placeholder, value, error, onChange } = props;
   return (
      <div className="field">
         <label htmlFor={name}>{label}</label>
         <div className="control">
            <input
               type={type}
               name={name}
               className="input"
               placeholder={placeholder}
               onChange={onChange}
               value={value}
            />
         </div>
         {error && <p className="help has-text-danger">This is a help text</p>}
      </div>
   );
};

TextFieldGroup.propTypes = {
   label: PropTypes.string,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   placeholder: PropTypes.string,
   value: PropTypes.string,
   error: PropTypes.string,
   onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
   type: 'text'
};


export default TextFieldGroup;
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = props => {
   const { name, placeholder, value, error, onChange } = props;
   return (      
      <div className="field">
         <div className="control">
            <textarea
               className={classnames('textarea', { 'is-danger': error })}
               name={name}
               value={value}
               placeholder={placeholder}
               onChange={onChange}
               cols="30"
               rows="5"
            />
         </div>
         {error ? <p className="help has-text-danger">{error}</p> : null}
      </div>
   );
};

TextAreaFieldGroup.propTypes = {
   name: PropTypes.string.isRequired,
   placeholder: PropTypes.string,
   value: PropTypes.string,
   error: PropTypes.string,
   onChange: PropTypes.func.isRequired
};


export default TextAreaFieldGroup;
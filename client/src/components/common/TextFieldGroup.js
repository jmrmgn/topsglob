import React from 'react';
import classnames from 'classnames';
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
               className={classnames('input')}
               placeholder={placeholder}
               onChange={onChange}
               value={value}
            />
         </div>
         {
            error.length > 0 &&
               error.map((err, index) => {
                  return (
                     err.param === name && <p className="help has-text-danger" key={index} >{err.msg}</p>
                  );
               })
         }
      </div>
   );
};

TextFieldGroup.propTypes = {
   label: PropTypes.string,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   placeholder: PropTypes.string,
   value: PropTypes.string,
   error: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
   onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
   type: 'text'
};


export default TextFieldGroup;
import React from 'react';
import PropTypes from 'prop-types';

const Flash = props => {
   const { status, msg } = props;

   const icon = (status === 200 || status === 201)
      ? <i className="fas fa-check"></i>
      : <i className="fas fa-exclamation-triangle"></i>;

   const isSuccess = (status === 200 || status === 201) 
      ? 'container has-text-success' 
      : 'container has-text-danger';

   return (
      <React.Fragment>
         <section className="hero is-light m-b-md">
            <div className="hero-body p-t-sm p-b-sm">
               <div className={isSuccess}>
                  {icon}
                  <span className="is-size-6 m-l-sm">
                     {msg}
                  </span>
               </div>
            </div>
         </section>
      </React.Fragment>
   );
};

Flash.propTypes = {
   msg: PropTypes.string.isRequired,
   status: PropTypes.number.isRequired
};

export default Flash;
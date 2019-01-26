import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Modal = props => {
   const { onOpen, onClose, modalContent } = props;
   return (
      <div className={classnames('modal', { 'is-active': onOpen })}>
         <div className="modal-background" onClick={onClose}></div>
         <div className="modal-content">
            {modalContent}
         </div>
         <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
      </div>
   );
};

Modal.propTypes = {
   onOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   modalContent: PropTypes.element.isRequired
};

export default Modal;
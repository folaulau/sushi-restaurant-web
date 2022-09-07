import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmationModal(props) {

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => props.close()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Please Confirm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row mb-4">
                <div className="col-12 col-md-12">
                    {props.question}
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-12">
                    <button type="button" className="btn btn-outline-danger me-2" onClick={()=>props.confirm('cancel')}>Cancel</button>
                    <button type="button" className="btn btn-outline-primary" onClick={()=>props.confirm('confirm')}>Confirm</button>
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
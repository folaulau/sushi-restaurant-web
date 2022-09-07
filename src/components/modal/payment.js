import Modal from 'react-bootstrap/Modal';
import { useState , useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function PaymentModal(props) {

  const stripePromise = loadStripe("pk_test_51LfUTfIa0haEjpKkeUxoahMkMAqKcrQH3EjS68LmVG5v59RSbTWS1oMmlpMz7Gw3sX8W5BplsGqwKKl6PoV4QWlv00fbwMFpMT");

  useEffect(() => {
    // signUpWithEmailAndPassword()
    console.log("PaymentModal")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row mb-4">
                <div className="col-12 col-md-12">

                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-12 d-grid gap-2 text-end">
                    <button type="button" className="btn btn-outline-primary" onClick={()=>props.confirm('confirm')}>Pay</button>
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PaymentModal;
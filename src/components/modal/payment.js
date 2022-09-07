import Modal from 'react-bootstrap/Modal';
import { useState , useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentApi from '../../api/PaymentApi';
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "./payment.css";

function PaymentModal(props) {

  const stripePromise = loadStripe("pk_test_51LfUTfIa0haEjpKkeUxoahMkMAqKcrQH3EjS68LmVG5v59RSbTWS1oMmlpMz7Gw3sX8W5BplsGqwKKl6PoV4QWlv00fbwMFpMT");
  
  const [paymentIntent, setPaymentIntent] = useState({clientSecret:null,id:null});

  useEffect(() => {
    // signUpWithEmailAndPassword()
    console.log("PaymentModal")
    getClientSecret()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClientSecret = () => {
    let payload = {};
    payload.products = props.orderList;

    PaymentApi.getPaymentIntent(payload)
    .then((response) => {
      console.log("response: ", response);
      setPaymentIntent(response.data)
    })
    .catch((error)=>{
        console.log("error: ", error);
    });
  }

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret: paymentIntent.clientSecret,
    appearance,
  };

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
            <div className="row">
                <div className="col-12 col-md-12">
                  <div className="row mb-4">
                      <div className="col-12 col-md-12">
                        {paymentIntent.clientSecret && (
                          <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                          </Elements>
                        )}
                      </div>
                  </div>
                  {/* <div className="row">
                      <div className="col-12 col-md-12 d-grid gap-2 text-end">
                          <button type="button" className="btn btn-outline-primary" onClick={()=>props.confirm('confirm')}>Pay</button>
                      </div>
                  </div> */}
                </div>
            </div>
            
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PaymentModal;

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3007/cart?payment=success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      
      <div className="row">
          <div className="col-12 col-md-12 d-grid gap-2 text-end">
              <button className='payment-btn btn btn-outline-primary' disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                  {isLoading ? <div className="spinner" id="spinner"></div> : "Pay"}
                </span>
              </button>
          </div>
      </div>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
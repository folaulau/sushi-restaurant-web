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
import Storage from '../../store/storage';
import Auth from '../auth/auth';

function PaymentModal(props) {

  // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

  const [stripePromise, setStripePromise] = useState("");
  
  const [paymentIntent, setPaymentIntent] = useState({clientSecret:null,id:null,serviceFee:0,stripeFee:0,orderCost:0,deliveryFee:0,taxFee:0,total:0});

  const [savePaymentMethod, setSavePaymentMethod] = useState(false);

  const [showCardInfo, setShowCardInfo] = useState(false);

  useEffect(() => {
    // signUpWithEmailAndPassword()
    console.log("PaymentModal ", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

    setStripePromise(() => loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClientSecret = () => {

    let auth = Auth.getAuth();

    let payload = {};
    payload.userUuid = auth ? auth.uuid : null;
    payload.orderUuid = props.orderUuid;
    payload.savePaymentMethod = savePaymentMethod;
    payload.paymentIntentId = paymentIntent.id;

    PaymentApi.generatePaymentIntent(payload)
    .then((response) => {
      console.log("response.data: ", response.data);
      setPaymentIntent(response.data)

      Storage.setJson("paymentIntent",response.data)

      setShowCardInfo(true)
    })
    .catch((error)=>{
        console.log("error: ", error);

        setShowCardInfo(false)
    });
  }

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret: paymentIntent.clientSecret,
    appearance,
  };

  const handleSavePaymentMethod = (event) => {
    console.log("handleSavePaymentMethod")
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if(name==="saveForFutureUse" && value==="yes"){
      setSavePaymentMethod(true);
    }else{
      setSavePaymentMethod(false);
    }

    getClientSecret();
  }

  const onShow = () => {
    console.log("onShow")

    let savedPaymentIntent = Storage.getJson("paymentIntent");

    if(Object.keys(savedPaymentIntent).length !== 0){
      setPaymentIntent(savedPaymentIntent)
    }

    getClientSecret()

  }

  function showCheckout(){

    if(paymentIntent.clientSecret && showCardInfo){
      console.log("show form");
      return (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm changeSavePaymentMethod={handleSavePaymentMethod} />
        </Elements>
      );
    }else{
      console.log("show no form");
      return (<div></div>);
    }
    
  }

  return (
    <>
      <Modal
        show={props.show}
        onEntered={()=>onShow()}
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
                  <div className="row">
                      <div className="col-12 col-md-12">
                        <strong>Order Summary</strong>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-12 col-md-12">
                        Items: ${paymentIntent.orderCost.toFixed(2)}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-12 col-md-12">
                        Service Fee: ${paymentIntent.serviceFee.toFixed(2)}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-12 col-md-12">
                        Delivery Fee: ${paymentIntent.deliveryFee.toFixed(2)}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-12 col-md-12">
                        Tax: ${paymentIntent.taxFee.toFixed(2)}
                      </div>
                  </div>
                  <div className="row mb-4">
                      <div className="col-12 col-md-12">
                        <strong>Order Total:</strong> ${paymentIntent.total.toFixed(2)}
                      </div>
                  </div>
                
                  <div className="row mb-4">
                      <div className="col-12 col-md-12">
                        {showCheckout()}
                      </div>
                  </div>
                </div>
            </div>
            
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PaymentModal;

function CheckoutForm(props) {
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
        return_url: process.env.REACT_APP_URL+"/cart?payment=success",
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
      
      <div className="row mb-2">
          <div className="col-12 col-md-12">
            <div className="form-check">
              <input className="form-check-input" 
              type="checkbox" 
              value="yes" 
              name="saveForFutureUse"
              onChange={props.changeSavePaymentMethod}
              />
              <label className="form-check-label">
                Save for future use
              </label>
            </div>
          </div>
      </div>
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
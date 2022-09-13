import { useState , useEffect, useRef} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Autocomplete from "react-google-autocomplete";
import PaymentApi from "../api/PaymentApi";
import Header from "../layout/header";
import Footer from "../layout/footer";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "./payment.css";
import Storage from '../store/storage';
import Auth from '../components/auth/auth';
import { useSelector } from 'react-redux'
function Payment() {

  // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

  const order = useSelector((state) => state.cart.order)

  const [stripePromise, setStripePromise] = useState("");
  
  const [paymentIntent, setPaymentIntent] = useState({clientSecret:null,id:null,serviceFee:0,stripeFee:0,lineItemsTotal:0,deliveryFee:0,taxFee:0,total:0});
  
  const [addressAsLine] = useState("");

  const [auth] = useState(Auth.getAuth());
  
  const addressUuidInput = useRef(null);

  const [payment, setPayment] = useState({ savePaymentMethod: false, deliveryMethod:"PICK_UP",deliveryAddress:{uuid:"",street:"",street2:"",city:"",zipcode:"",state:"",longitude:null,latitude:null}});

  const [showCardInfo, setShowCardInfo] = useState(false);

  useEffect(() => {
    // signUpWithEmailAndPassword()
    console.log("PaymentModal ", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

    setStripePromise(() => loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY))

    addressUuidInput.current = "";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    getClientSecret()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment.savePaymentMethod,payment.deliveryAddress]);

  const getClientSecret = () => {

    let payload = {};
    payload.userUuid = auth ? auth.uuid : null;
    payload.orderUuid = order.uuid;
    payload.savePaymentMethod = payment.savePaymentMethod;
    payload.paymentIntentId = paymentIntent.id;
    payload.deliveryMethod = payment.deliveryMethod;
    payload.deliveryAddress = payment.deliveryAddress;

    console.log("payload: ", payload)

    PaymentApi.generatePaymentIntent(payload)
    .then((response) => {
      console.log("response.data: ", response.data);
      setPaymentIntent(response.data)

      Storage.setJson("paymentIntent",response.data)

      setShowCardInfo(true)
    })
    .catch((error)=>{
        console.log("error: ", error.response.data);

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

  const handlePaymentChange = (event) => {
    console.log("handleSavePaymentMethod")
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log("name, ", name)
    console.log("value, ", value)

    setPayment({
      ...payment,
      [name]: value
    })
  }

  function showCheckout(){

    if(paymentIntent.clientSecret && showCardInfo){
      console.log("show form");
      return (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderUuid={order.uuid} auth={auth} changeSavePaymentMethod={handlePaymentChange} />
        </Elements>
      );
    }else{
      console.log("show no form");
      return (<div></div>);
    }
    
  }

  const updateAddress = (place) => {
    const formattedAddress = place.formatted_address;

    let newAddress = {
      street: formattedAddress.split(",")[0],
      city: formattedAddress.split(",")[1].trim(),
      state: formattedAddress.split(",")[2].trim().split(" ")[0],
      zipcode: formattedAddress.split(",")[2].trim().split(" ")[1],
      country: formattedAddress.split(",")[3].trim(),
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    let deliveryAddress = 'deliveryAddress'
    setPayment({
      ...payment,
      [deliveryAddress]: newAddress
    })

    console.log("updated address: ", newAddress);
  };

  return (
    <>
      <Header />
        <div className="container">
          <div className="row">
              <div className="col-12  col-md-6 offset-md-3">
                <div className="row">
                    <div className="col-12 col-md-7 offset-md-5">
                      <h4>Order Summary</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 text-end">
                      Items:
                    </div>
                    <div className="col-12 col-md-6 text-start">
                      ${paymentIntent.lineItemsTotal.toFixed(2)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 text-end">
                      Service Fee:
                    </div>
                    <div className="col-12 col-md-6 text-start">
                      ${(paymentIntent.stripeFee+paymentIntent.serviceFee).toFixed(2)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 text-end">
                      Delivery Fee:
                    </div>
                    <div className="col-12 col-md-6 text-start">
                      ${paymentIntent.deliveryFee.toFixed(2)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 text-end">
                      Tax:
                    </div>
                    <div className="col-12 col-md-6 text-start">
                      ${paymentIntent.taxFee.toFixed(2)}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-6 text-end">
                      <strong>Order Total:</strong>
                    </div>
                    <div className="col-12 col-md-6 text-start">
                    ${paymentIntent.total.toFixed(2)}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-6 text-end">
                    Delivery Method:
                    </div>
                    <div className="col-12 col-md-6 text-start">
                      <select className="form-select" name="deliveryMethod" value={payment.deliveryMethod} onChange={handlePaymentChange}>
                        <option value="PICK_UP">Pick Up</option>
                        <option value="DROP_OFF">Drop Off</option>
                      </select>
                    </div>
                </div>
                { (payment.deliveryMethod === "DROP_OFF") && 
                  <div className="row mb-3">
                    <div className="col-12 col-md-6 text-end">
                    Address:
                    </div>
                    <div className="col-12 col-md-6 text-start">
                    
                      <div className="mb-3">
                      <Autocomplete
                        type="deliveryAddress"
                        name="name"
                        id="name"
                        defaultValue={addressAsLine}
                        ref={addressUuidInput}
                        className="form-control"
                        apiKey="AIzaSyCWPe0Y1xqKVM4mMNqMxNYwSsmB5dsg-lk"
                        onPlaceSelected={(place, inputRef, autocomplete) =>
                          updateAddress(place)
                        }
                        style={{
                          border: '2px solid #85d8e7',
                          color: 'black'
                        }}
                        options={{
                          types: ['address'],
                        }}
                      />
                      </div>
                    </div>
                  </div>
                }

                <div className="row mb-4">
                    <div className="col-12 col-md-12">
                      {showCheckout()}
                    </div>
                </div>
              </div>
          </div>
        </div>
      <Footer />
    </>
  );
}

export default Payment;

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
        return_url: process.env.REACT_APP_URL+"/receipt?payment=success&orderUuid="+props.orderUuid,
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
      
      {props.auth && 
        <div className="row mb-2">
            <div className="col-12 col-md-12">
              <div className="form-check">
                <input className="form-check-input" 
                type="checkbox" 
                value="yes" 
                name="savePaymentMethod"
                onChange={props.changeSavePaymentMethod}
                />
                <label className="form-check-label">
                  Save for future use
                </label>
              </div>
            </div>
        </div>
      }
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
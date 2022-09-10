import axios from 'axios';
import Auth from '../components/auth/auth';

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/v1"
});

var xApiKey = process.env.REACT_APP_X_API_KEY

const PaymentApi = {

    generatePaymentIntent: (payload) => {

        let auth = Auth.getAuth()

        let headers = {
            'Content-Type': 'application/json'
        }

        let url = '/stripe/guest/paymentintent/order';

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
            url = '/stripe/paymentintent/order';
        }

        const options = {
            headers: headers
        };

        return instance.post(url, JSON.stringify(payload), options);
    }
}

export default PaymentApi;
import axios from 'axios';
import Auth from '../components/auth/auth'

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/v1"
});

var xApiKey = process.env.REACT_APP_X_API_KEY

const OrderApi = {

    createUpdateOrder: (order) => {

        let auth = Auth.getAuth()

        let headers = {
            'Content-Type': 'application/json'
        }

        let url = '/orders/guest/current';

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
            url = '/orders/current';
        }

        const options = {
            headers: headers
        };

        return instance.post(url, JSON.stringify(order), options);
    },
    removeItem: (order) => {

        let auth = Auth.getAuth()

        let headers = {
            'Content-Type': 'application/json'
        }

        let url = '/orders/guest/current/remove-item';

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
            url = '/orders/current/remove-item';
        }

        const options = {
            headers: headers
        };

        return instance.put(url, JSON.stringify(order), options);
    },
    getOrder: (uuid) => {

        let auth = Auth.getAuth()

        let headers = {
            'Content-Type': 'application/json'
        }

        let url = '/orders/guest/current';

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
            url = '/orders/current';
        }

        url = (url + "?uuid="+uuid)

        const options = {
            headers: headers
        };

        return instance.get(url, options);
    },
    confirmPayment: (order) => {

        let auth = Auth.getAuth()

        let headers = {
            'Content-Type': 'application/json'
        }

        let url = '/orders/guest/confirm-payment';

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
            url = '/orders/guest/confirm-payment';
        }

        const options = {
            headers: headers
        };

        return instance.put(url, JSON.stringify(order), options);
    },
}

export default OrderApi;
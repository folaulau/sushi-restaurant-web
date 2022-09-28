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

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
        }

        const options = {
            headers: headers
        };

        return instance.post('/orders/current', JSON.stringify(order), options);
    },
    removeItem: (order) => {

        let auth = Auth.getAuth()

        let headers = {
            'Content-Type': 'application/json'
        }

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
        }

        const options = {
            headers: headers
        };

        return instance.put('/orders/current/remove-item', JSON.stringify(order), options);
    },
    getOrder: (uuid) => {

        let auth = Auth.getAuth()

        let headers = {
            'Content-Type': 'application/json'
        }

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
        }

        const options = {
            headers: headers
        };

        return instance.get('/orders/current?uuid='+uuid, options);
    },
    confirmPayment: (order) => {

        let auth = Auth.getAuth()

        let headers = {
            'Content-Type': 'application/json'
        }

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
        }

        const options = {
            headers: headers
        };

        return instance.put('/orders/confirm-payment', JSON.stringify(order), options);
    },
}

export default OrderApi;
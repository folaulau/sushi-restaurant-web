import axios from 'axios';
import Auth from '../components/auth/auth'

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/v1"
});

var xApiKey = process.env.REACT_APP_X_API_KEY

const ReservationApi = {

    create: (reservation) => {

        let auth = Auth.getAuth()

        let headers = {
            'Content-Type': 'application/json'
        }

        let url = '/reservations/guest/reservation';

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
            url = '/reservations/reservation';
        }

        const options = {
            headers: headers
        };

        return instance.post(url, JSON.stringify(reservation), options);
    },
    update: (reservation) => {

        let auth = Auth.getAuth()

        let headers = {
            'Content-Type': 'application/json'
        }

        let url = '/reservations/guest/reservation';

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
            url = '/reservations/reservation';
        }

        const options = {
            headers: headers
        };

        return instance.put(url, JSON.stringify(reservation), options);
    },
    get: (uuid) => {

        let auth = Auth.getAuth()

        let headers = {
            'Content-Type': 'application/json'
        }

        let url = '/reservations/guest/reservation';

        if(auth==null){
            headers['x-api-key'] = xApiKey
        }else{
            headers['token'] = auth.token
            url = '/reservations/reservation';
        }

        url = (url+"?uuid="+uuid)

        const options = {
            headers: headers
        };

        return instance.get(url, options);
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

export default ReservationApi;
import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.REACT_APP_AWS_BACKEND_URL
});

const BackendAPI = {

    getBackendStatus: () => {

        let headers = {
            'Content-Type': 'application/json'
        }

        let url = '';

        const options = {
            headers: headers
        };

        return instance.get(url, options);
    },
    turnOnBackendServices: () => {

        let headers = {
            'Content-Type': 'multipart/form-data'
        }

        let url = '/?action=on&service=sushi';

        const options = {
            headers: headers
        };

        let payload = {}



        return instance.post(url, payload, options);
    },
    turnOffBackendServices: () => {

        let headers = {
            'Content-Type': 'multipart/form-data'
        }

        let url = '/?action=off&service=sushi';

        const options = {
            headers: headers
        };

        let payload = {}



        return instance.post(url, payload, options);
    }
}

export default BackendAPI;
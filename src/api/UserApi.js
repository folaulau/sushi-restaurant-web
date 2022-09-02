import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/v1"
});

var xApiKey = process.env.REACT_APP_X_API_KEY

const UserApi = {

    authenticate: (payload) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': xApiKey
            }
        };
        return instance.post('/users/authenticate', JSON.stringify(payload), options);
    }
}

export default UserApi;
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://fir-react-c8f4d.firebaseio.com/'
});

export default instance;
import axios from 'axios';

const client = axios.create();

/*
// API 주소를 다른 곳으로 사용함
client.defaults.baseURL = 'https://external-api-server.com'


*/

export default client;
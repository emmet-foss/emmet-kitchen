import { Client } from './helper/client';
const emmetUrl = process.env.EMMET_API || 'http://localhost:3001';

const api = new Client(emmetUrl, options);
api.fetchUrl = (url) => fetch(emmetUrl + '/api/v1/stores');

export default api;
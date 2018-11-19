import axios from 'axios';
import { API_HOST } from 'react-native-dotenv';

const API_BASE_PATH = '/api/v1';
const API_BASE_URL = `http://${API_HOST}${API_BASE_PATH}`;

export default (options = {}) => axios.create({ baseURL: API_BASE_URL, withCredentials: true, ...options });

import axios from 'axios';
import { API_URL } from '../utils/apiURL';

export const api = axios.create({
  baseURL: API_URL
});

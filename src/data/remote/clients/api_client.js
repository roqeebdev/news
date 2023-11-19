import Axios from "axios";
import { API_BASE_URL, API_EMAIL_BASE_URL, HEADER} from "../../../utils/constant";


export const apiClient = Axios.create({
    baseURL: '/api/',
    headers: HEADER,  
      'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  withCredentials: true,
  mode: 'no-cors',

});

export const apiEmailClient = Axios.create({
    baseURL: API_EMAIL_BASE_URL,
    headers: HEADER,  
});
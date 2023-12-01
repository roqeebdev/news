import Axios from "axios";
import { API_BASE_URL, API_EMAIL_BASE_URL, EMAIL_HEADER, HEADER} from "../../../utils/constant";


export const apiClient = Axios.create({
    baseURL: API_BASE_URL,
    headers: HEADER,  
});

export const apiEmailClient = Axios.create({
    baseURL: '/email/',
    headers: EMAIL_HEADER,  
});
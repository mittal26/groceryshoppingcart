import axios from "axios";
import { toast } from 'react-toastify';
import logger from "../services/logService";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
    console.log("Interceptor called");
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedError) {
        console.log("Logging error", error);
        logger.log(error);
        toast.error("An unexpected Eror Occured!");
    }
    return Promise.reject(error)

})

function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
    setJwt
}
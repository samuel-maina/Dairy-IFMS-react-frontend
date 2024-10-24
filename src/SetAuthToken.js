import axios from 'axios';

export const SetAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.defaults.baseURL='http://127.0.0.1:8080';
        console.log("called me this time again");
    }
    else
        delete axios.defaults.headers.common["Authorization"];
};
export default SetAuthToken;



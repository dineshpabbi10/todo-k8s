import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://swapi.dev/api/",
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("access_token");
    if(token){
        config.headers['Authorization'] = 'Bearer ' + token
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
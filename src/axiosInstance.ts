import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_URL = 'http://10.7.249.249:8080';
axios.defaults.baseURL = API_URL;

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    console.log("axios working");
    return config;
};
const onRequestError = (err: AxiosError): Promise<AxiosError> => {
  console.log("axios working");
    return Promise.reject(err);
};
axios.interceptors.request.use(onRequest, onRequestError);

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.log("axios working");
    return response;
};
const onResponseError = (err: AxiosError): Promise<AxiosError> => {
  console.log("axios working");
    return Promise.reject(err);
};
axios.interceptors.response.use(onResponse, onResponseError);
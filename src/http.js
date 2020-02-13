import axios from "axios";

const http = axios.create({ baseURL: "/cloud-admin-api" });

http.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

http.interceptors.response.use(
  response => (response.data ? response.data : response),
  error => Promise.reject(error)
);

export default http;

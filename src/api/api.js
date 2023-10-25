import axios from "axios";

const defaultOptionsPatent = {
  baseURL: "http://192.168.11.57:18088/",
  headers: {
    "Content-Type": "application/json",
  },
};
let baseRoutPatent = axios.create(defaultOptionsPatent);

baseRoutPatent.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem("user")).access_token;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const unAuthorized = (error) => {
  if (error.toJSON().status === 401) {
    localStorage.clear();
    window.location.reload();
  } else {
    console.log(error.toJSON().status);
  }
};

export const getTimetable = () => {
  return baseRoutPatent
    .get(`/api/rooms`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      unAuthorized(error);
    });
};

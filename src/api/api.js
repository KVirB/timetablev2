import axios from "axios";

const defaultOptionsPatent = {
  baseURL: "http://192.168.11.57:18088/",
  headers: {
    "Content-Type": "application/json",
  },
};
const defaultOptionsPatentDean = {
  baseURL: "http://192.168.11.57:18076/",
  headers: {
    "Content-Type": "application/json",
  },
};
let baseRoutPatent = axios.create(defaultOptionsPatent);
let baseRoutPatentDean = axios.create(defaultOptionsPatentDean);

baseRoutPatent.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem("user")).access_token;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
baseRoutPatentDean.interceptors.request.use(function (config) {
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

export const getDiscipline = () => {
  return baseRoutPatentDean
    .get(`/api/disciplines/active?is=true`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      unAuthorized(error);
    });
};

export const getTeacher = () => {
  return baseRoutPatentDean
    .get(`/api/teachers/active?is=true`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      unAuthorized(error);
    });
};

export const getGroup = () => {
  return baseRoutPatentDean
    .get(`/api/groups/active?is=true`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      unAuthorized(error);
    });
};

export const updateTimetable = (dataRow) => {
  return baseRoutPatent
    .put(`/api/rooms/put`, dataRow)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      unAuthorized(error);
    });
};

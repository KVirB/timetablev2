import axios from "axios";
import { toast } from "react-hot-toast";

const defaultOptionsPatent = {
  baseURL: "http://192.168.11.252:18088/",
  headers: {
    "Content-Type": "application/json",
  },
};
const defaultOptionsPatentDean = {
  baseURL: "http://192.168.11.252:18076/",
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
      toast.success("Успешно сохранено");
      return response.data;
    })
    .catch((error) => {
      unAuthorized(error);
      toast.error(error.response.data);
    });
};

export const getFaculties = () => {
  return baseRoutPatentDean
    .get(`/api/faculties/active?is=true`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      unAuthorized(error);
    });
};

export const getExcelSchedule = (facultyId, course, faculty) => {
  toast.loading("Формирование Excel...");
  return baseRoutPatent
    .request({
      url: `/api/rooms/getExcel?facultyId=${facultyId}&course=${course}`,
      method: "GET",
      responseType: "blob",
    })
    .then(({ data }) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      let fileName = `Отчёт по группе ${faculty}`;
      link.href = downloadUrl;
      link.setAttribute("download", fileName + ".xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.dismiss();
      toast.success("Excel успешно сформирован");
    })
    .catch((error) => {
      toast.dismiss();
      toast.error(error.response.data);
    });
};

export const deleteScheduleRow = (id) => {
  return baseRoutPatent
    .delete(`api/rooms/delete?id=${id}`)
    .then((response) => {
      toast.success("Успешно удалено");
      return response.data;
    })
    .catch((error) => {
      unAuthorized(error);
      toast.error(error.repsonse.data);
    });
};

export const getRooms = () => {
  return baseRoutPatentDean
    .get(`/api/classes/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      unAuthorized(error);
    });
};

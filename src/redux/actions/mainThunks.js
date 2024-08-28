import {
  getTimetable,
  getDiscipline,
  getTeacher,
  getGroup,
  updateTimetable,
  getFaculties,
  getExcelSchedule,
  deleteScheduleRow,
  getRooms,
  getExcelScheduleZf,
} from "../../api/api";
import {
  setTimetable,
  setDiscipline,
  setTeacher,
  setGroup,
  setFaculties,
  setRooms,
} from "./mainActions";

export const getTimetableThunk = () => {
  return (dispatch) => {
    getTimetable().then((data) => {
      dispatch(setTimetable(data));
    });
  };
};

export const getDisciplineThunk = () => {
  return (dispatch) => {
    getDiscipline().then((data) => {
      dispatch(setDiscipline(data));
    });
  };
};

export const getTeacherThunk = () => {
  return (dispatch) => {
    getTeacher().then((data) => {
      dispatch(setTeacher(data));
    });
  };
};

export const getGroupThunk = () => {
  return (dispatch) => {
    getGroup().then((data) => {
      dispatch(setGroup(data));
    });
  };
};

export const updateTimetableThunk = (dataRow, check) => {
  return async (dispatch) => {
    await updateTimetable(dataRow, check);
    dispatch(getTimetableThunk());
  };
};

export const editTimetableThunk = (dataRow) => {
  return (dispatch) => {
    dispatch(setTimetable(dataRow));
  };
};

export const getFacultiesThunk = () => {
  return (dispatch) => {
    getFaculties().then((data) => {
      dispatch(setFaculties(data));
    });
  };
};

export const getExcelScheduleThunk = (
  facultyId,
  course,
  faculty,
  dateFromExcel,
  dateToExcel
) => {
  return (dispatch) => {
    getExcelSchedule(facultyId, course, faculty, dateFromExcel, dateToExcel);
  };
};

export const getExcelScheduleZfThunk = (
  groupsIds,
  sessionType,
  dateFromExcel,
  dateToExcel,
  groupsNames
) => {
  return (dispatch) => {
    getExcelScheduleZf(
      groupsIds,
      sessionType,
      dateFromExcel,
      dateToExcel,
      groupsNames
    );
  };
};

export const deleteScheduleRowThunk = (id) => {
  return async (dispatch) => {
    await deleteScheduleRow(id);
    dispatch(getTimetableThunk());
  };
};

export const getRoomsThunk = () => {
  return (dispatch) => {
    getRooms().then((data) => {
      dispatch(setRooms(data));
    });
  };
};

import {
  getTimetable,
  getDiscipline,
  getTeacher,
  getGroup,
  updateTimetable,
} from "../../api/api";
import {
  setTimetable,
  setDiscipline,
  setTeacher,
  setGroup,
  editTimetable,
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

export const updateTimetableThunk = (dataRow) => {
  return (dispatch) => {
    updateTimetable(dataRow);
  };
};

export const editTimetableThunk = (dataRow) => {
  return (dispatch) => {
    dispatch(setTimetable(dataRow));
  };
};

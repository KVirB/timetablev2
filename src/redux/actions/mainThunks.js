import { getTimetable, getDiscipline } from "../../api/api";
import { setTimetable, setDiscipline } from "./mainActions";

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

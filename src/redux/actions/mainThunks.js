import { getTimetable } from "../../api/api";
import { setTimetable } from "./mainActions";

export const getTimetableThunk = () => {
  return (dispatch) => {
    getTimetable().then((data) => {
      dispatch(setTimetable(data));
    });
  };
};

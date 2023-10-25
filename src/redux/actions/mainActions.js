import { SET_TIMETABLE } from "../types/mainTypes";

export const setTimetable = (timetable) => ({
  type: SET_TIMETABLE,
  timetable: timetable,
});

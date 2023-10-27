import { SET_TIMETABLE, SET_DISCIPLINE } from "../types/mainTypes";

export const setTimetable = (timetable) => ({
  type: SET_TIMETABLE,
  timetable: timetable,
});

export const setDiscipline = (discipline) => ({
  type: SET_DISCIPLINE,
  discipline: discipline,
});

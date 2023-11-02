import {
  SET_TIMETABLE,
  SET_DISCIPLINE,
  SET_TEACHER,
  SET_GROUP,
  EDIT_TIMETABLE,
} from "../types/mainTypes";

export const setTimetable = (timetable) => ({
  type: SET_TIMETABLE,
  timetable: timetable,
});

export const setDiscipline = (discipline) => ({
  type: SET_DISCIPLINE,
  discipline: discipline,
});

export const setTeacher = (teacher) => ({
  type: SET_TEACHER,
  teacher: teacher,
});

export const setGroup = (group) => ({
  type: SET_GROUP,
  group: group,
});

export const editTimetable = (dataRow) => ({
  type: EDIT_TIMETABLE,
  dataRow: dataRow,
});

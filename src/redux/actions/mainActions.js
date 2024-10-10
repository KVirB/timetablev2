import {
  SET_TIMETABLE,
  SET_DISCIPLINE,
  SET_TEACHER,
  SET_GROUP,
  EDIT_TIMETABLE,
  SET_FACULTIES,
  SET_ROOMS,
  SET_HIDDENGROUPS,
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

export const setHiddenGroups = (hiddenGroups) => ({
  type: SET_HIDDENGROUPS,
  hiddenGroups: hiddenGroups,
});

export const editTimetable = (dataRow) => ({
  type: EDIT_TIMETABLE,
  dataRow: dataRow,
});

export const setFaculties = (faculty) => ({
  type: SET_FACULTIES,
  faculty: faculty,
});
export const setRooms = (rooms) => ({
  type: SET_ROOMS,
  rooms: rooms,
});

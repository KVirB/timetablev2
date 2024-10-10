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

let initialState = {
  timetable: [],
  discipline: [],
  teacher: [],
  group: [],
  faculty: [],
  rooms: [],
  hiddenGroups: [],
};
const weekdays = {
  0: "Понедельник",
  1: "Вторник",
  2: "Среда",
  3: "Четверг",
  4: "Пятница",
  5: "Суббота",
  6: "Воскресенье",
};
const lessonHours = {
  1: "8:00",
  2: "9:50",
  3: "11:40",
  4: "14:00",
  5: "15:45",
  6: "17:30",
  7: "19:15",
  20: " ",
};
const frame = {
  FIRST: "1Корпус",
  SECOND: "2Корпус",
  FOURTH: "4Корпус",
  FIFTH: "5Корпус",
  UNKNOWN: "Неизвестно",
};
const roomType = {
  LECTURE: "Лекционная",
  LAB: "Лаболатория",
  SPEC_LAB: "Спец. Лаболатория",
  COMPUTER_CLASS: "Комп. Класс",
  PICTURE: "Рисунок",
  PICTURE_ART: "Рисунок/Живопись",
  ART: "Живопись",
  EMPTY: "Общая",
  STUDY_CLASS: "Учебная аудитория",
  GYM: "Спортзал",
  UNKNOWN: "Неизвестно",
};
const weekType = {
  ALWAYS: "Всегда",
  NUMERATOR: "Числитель",
  DENOMINATOR: "Знаменатель",
  FIRST: "Первая",
  SECOND: "Вторая",
  THIRD: "Третья",
  FOURTH: "Четвертая",
};
const subGroup = {
  FIRST: "Первая",
  SECOND: "Вторая",
  ALL: "Все",
  SEWING: "Швейники",
  SHOE: "Обувщики",
  TEXTILE: "Текстильщики",
};
const lessonType = {
  PRACTICE: "Практическая",
  LAB: "Лабораторная",
  SEMINAR: "Семинар",
  LECTURE: "Лекция",
  EXAM: "Экзамен",
  CONSULTATION: "Консультация",
  SCORE: "Зачёт",
  COURSE_PROJECT_DEFENSE: "Защита курсовой работы",
  COURSE_WORK_DEFENSE: "Защита курсового проекта",
  EXAM_REVIEW: "Экзаменационный просмотр",
  DIFF_SCORE: "Дифференцированный зачёт",
  PRACTICE_DEFENSE: "Защита отчёта по практике",
  UNKNOWN: "Неизвестно",
};
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMETABLE:
      const updatedTimetable =
        action.timetable &&
        action.timetable
          .map((event) => ({
            ...event,
            dayTable: weekdays[event.day],
            lessonNumberTable: lessonHours[event.lessonNumber],
            frameTable: frame[event.frame],
            roomNumberTable: event.roomNumber + " " + roomType[event.roomType],
            weekTypeTable: weekType[event.weekType],
            subGroupTable: subGroup[event.subGroup],
            lessonTypeTable: lessonType[event.lessonType],
          }))
          .sort((a, b) => {
            return a.frameTable - b.frameTable;
          });
      return {
        ...state,
        timetable: updatedTimetable,
      };
    case SET_DISCIPLINE:
      return {
        ...state,
        discipline: [...action.discipline],
      };
    case SET_TEACHER:
      return {
        ...state,
        teacher: [...action.teacher],
      };
    case SET_GROUP:
      return {
        ...state,
        group: [...action.group],
      };
    case SET_HIDDENGROUPS:
      return {
        ...state,
        hiddenGroups: action.hiddenGroups,
      };
    case EDIT_TIMETABLE:
      return {
        ...state,
        timetable: action.timetable,
      };
    case SET_FACULTIES:
      return {
        ...state,
        faculty: [...action.faculty],
      };
    case SET_ROOMS:
      const updatedRooms = action.rooms
        .map((event) => ({
          ...event,
          frame: frame[event.frame],
        }))
        .sort((a, b) => {
          return a.frame - b.frame;
        });
      return {
        ...state,
        rooms: updatedRooms,
      };
    default:
      return state;
  }
};

export default mainReducer;

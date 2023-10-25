import { SET_TIMETABLE } from "../types/mainTypes";

let initialState = {
  timetable: [],
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
};
const frame = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
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
  0: "Первая",
  1: "Вторая",
  2: "Все",
  3: "Третья",
  4: "Четвертая",
  5: "Неизвестно",
};
const lessonType = {
  PRACTICE: "Практическая",
  LAB: "Лабораторная",
  LECTURE: "Лекция",
  UNKNOWN: "Неизвестно",
};
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMETABLE:
      const updatedTimetable = action.timetable
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
    default:
      return state;
  }
};

export default mainReducer;

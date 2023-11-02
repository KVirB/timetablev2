import { useState, useMemo, useCallback, useEffect } from "react";
import Select from "react-select-virtualized";
import Modal from "react-modal";
import { lessonHours, leessonOfType, subGroup, weekType } from "./ConstantMain";

const ModalMain = (props) => {
  const [addDataRow, setAddDataRow] = useState({});
  useEffect(() => {
    setAddDataRow({
      ...props.dataRow,
      // id: props.maxId + 1,
      lessonId: props.maxId + 1,
    });
  }, [props.dataRow, props.maxId]);
  return (
    <div>
      {console.log(addDataRow)}
      {console.log(props.dataRow)}
      <Modal
        ariaHideApp={false}
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        contentLabel="Main Modal"
        overlayClassName={"modal_open"}
      >
        <div>
          <label style={{ display: "block" }}>Корпус</label>
          <span>{props.dataRow && props.dataRow.frameTable}</span>
        </div>
        <div>
          <label style={{ display: "block" }}>Аудитория</label>
          <span>{props.dataRow && props.dataRow.roomNumberTable}</span>
        </div>
        <div>
          <label style={{ display: "block" }}>День недели</label>
          <span>{props.dataRow && props.dataRow.dayTable}</span>
        </div>
        <Select
          className=""
          isClearable
          onChange={(e) => {
            addDataRow.lessonNumber = e.value;
            addDataRow.lessonNumberTable = e.label;
          }}
          defaultValue={{ value: "time", label: "Время" }}
          options={lessonHours}
        />
        <Select
          className=""
          isClearable
          onChange={(e) => {
            addDataRow.disciplineName = e.label.substring(
              0,
              e.label.indexOf(" (")
            );
            addDataRow.disciplineId = e.value;
          }}
          defaultValue={{ value: "discipline", label: "Дисциплина" }}
          options={props.discipline.map((m) => ({
            value: m.id,
            label:
              m.name +
              " (" +
              (m.department !== null
                ? m.department.shortName + " Наше"
                : "Нет кафедры") +
              ")",
          }))}
        />
        <Select
          className=""
          isClearable
          onChange={(e) => {
            addDataRow.lessonType = e.value;
            addDataRow.lessonTypeTable = e.label;
          }}
          defaultValue={{ value: "typeOfLesson", label: "Тип занятия" }}
          options={leessonOfType}
        />
        <Select
          className=""
          isClearable
          onChange={(e) => {
            addDataRow.teacherFullName = e.label;
            addDataRow.teacherId = e.value;
          }}
          defaultValue={{ value: "teacher", label: "Преподаватель" }}
          options={props.teacher.map((m) => ({
            value: m.id,
            label: m.fullName,
          }))}
        />
        <Select
          className=""
          isClearable
          onChange={(e) => {
            addDataRow.group = e.label;
            addDataRow.groupId = e.value;
          }}
          defaultValue={{ value: "group", label: "Группа" }}
          options={props.group.map((m) => ({
            value: m.id,
            label: m.name,
          }))}
        />
        <Select
          className=""
          isClearable
          onChange={(e) => {
            addDataRow.subGroup = e.value;
            addDataRow.subGroupTable = e.label;
          }}
          defaultValue={{ value: "subGroup", label: "Подгруппа" }}
          options={subGroup}
        />
        <Select
          className=""
          isClearable
          onChange={(e) => {
            addDataRow.weekType = e.value;
            addDataRow.weekTypeTable = e.label;
          }}
          defaultValue={{ value: "week", label: "Неделя" }}
          options={weekType}
        />
        {/* Yamaxilla Больше не делай на один запрос 2 метода <3 */}
        <button
          onClick={() => {
            let index = props.timetable.findIndex(
              (obj) => obj.lessonId === addDataRow.lessonId
            );
            if (index !== -1) {
              addDataRow.id = props.dataRow.lessonId;
              props.timetable[index] = addDataRow;
              props.editTimetableThunk(props.timetable);
            }
            props.updateTimetableThunk(addDataRow);
          }}
        >
          Редактировать
        </button>
        <button
          onClick={() => {
            const newTimetable = props.timetable;
            newTimetable.unshift(addDataRow);
            props.editTimetableThunk(newTimetable);
            props.updateTimetableThunk(addDataRow);
          }}
        >
          Добавить
        </button>
        <button onClick={props.closeModal}>close</button>
      </Modal>
    </div>
  );
};

export default ModalMain;

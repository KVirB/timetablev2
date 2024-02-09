import { useState, useRef, useEffect } from "react";
import Select from "react-select-virtualized";
import Modal from "react-modal";
import { lessonHours, leessonOfType, subGroup, weekType } from "./ConstantMain";
import { toast } from "react-hot-toast";

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
    <>
      <Modal
        ariaHideApp={false}
        className={"modal-window"}
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        contentLabel="Main Modal"
        overlayClassName={"modal_open"}
      >
        <div className="modal-menu-main">
          {console.log(props.rooms)}
          <div className="modal-container">
            <label className="modal-label">Корпус:</label>
            <span className="modal-span">
              {props.dataRow && props.dataRow.frameTable}
            </span>
          </div>
          <div className="modal-container">
            <label className="modal-label">
              Аудитория: {props.dataRow && props.dataRow.roomNumber}
            </label>
            <Select
              className=""
              placeholder="Выберите аудиторию"
              onChange={(e) => {
                if (e !== null) {
                  addDataRow.roomId = e.value;
                  addDataRow.roomNumber = e.label;
                }
              }}
              defaultValue={{ value: "room", label: "Аудитория" }}
              options={props.rooms.map((room) => ({
                value: room.id,
                label: `${room.frame} ${room.roomNumber}`,
              }))}
              formatOptionLabel={({ label }) => (
                <div className="fast-option-custom" title={label}>
                  {label}
                </div>
              )}
            />
          </div>
          <div className="modal-container">
            <label className="modal-label">День недели:</label>
            <span className="modal-span">
              {props.dataRow && props.dataRow.dayTable}
            </span>
          </div>
          <div className="modal-container data-containers">
            <div className="data-div">
              <label className="modal-label">Дата С:</label>
              <input
                className="data"
                type="date"
                name="startDate"
                onChange={(e) => {
                  addDataRow.startDate = e.target.value;
                  console.log(addDataRow);
                }}
              ></input>
            </div>
            <div className="data-div">
              <label className="modal-label">Дата По:</label>
              <input
                type="date"
                className="data"
                name="endDate"
                onChange={(e) => {
                  addDataRow.endDate = e.target.value;
                  console.log(addDataRow);
                }}
              ></input>
            </div>
          </div>
          <Select
            className=""
            placeholder="Выберите время"
            onChange={(e) => {
              if (e !== null) {
                addDataRow.lessonNumber = e.value;
                addDataRow.lessonNumberTable = e.label;
              }
            }}
            defaultValue={{ value: "time", label: "Время" }}
            options={lessonHours}
            formatOptionLabel={({ label }) => (
              <div className="fast-option-custom" title={label}>
                {label}
              </div>
            )}
          />
          <Select
            className=""
            placeholder="Выберите дисциплину"
            onChange={(e) => {
              if (e !== null) {
                addDataRow.disciplineName = e.label.substring(
                  0,
                  e.label.indexOf(" (")
                );
                addDataRow.disciplineId = e.value;
              }
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
            formatOptionLabel={({ label }) => (
              <div className="fast-option-custom" title={label}>
                {label}
              </div>
            )}
          />
          <Select
            className=""
            placeholder="Выберите тип занятия"
            onChange={(e) => {
              if (e !== null) {
                addDataRow.lessonType = e.value;
                addDataRow.lessonTypeTable = e.label;
              }
            }}
            defaultValue={{ value: "typeOfLesson", label: "Тип занятия" }}
            options={leessonOfType}
            formatOptionLabel={({ label }) => (
              <div className="fast-option-custom" title={label}>
                {label}
              </div>
            )}
          />
          <Select
            className=""
            placeholder="Выберите преподавателя"
            onChange={(e) => {
              if (e !== null) {
                addDataRow.teacherFullName = e.label;
                addDataRow.teacherId = e.value;
              }
            }}
            defaultValue={{ value: "teacher", label: "Преподаватель" }}
            options={props.teacher.map((m) => ({
              value: m.id,
              label: m.fullName,
            }))}
            formatOptionLabel={({ label }) => (
              <div className="fast-option-custom" title={label}>
                {label}
              </div>
            )}
          />
          <Select
            className=""
            placeholder="Выберите группу"
            onChange={(e) => {
              if (e !== null) {
                addDataRow.group = e.label;
                addDataRow.groupId = e.value;
              }
            }}
            defaultValue={{ value: "group", label: "Группа" }}
            options={props.group.map((m) => ({
              value: m.id,
              label: m.name,
            }))}
            formatOptionLabel={({ label }) => (
              <div className="fast-option-custom" title={label}>
                {label}
              </div>
            )}
          />
          <Select
            className=""
            placeholder="Выберите подгруппу"
            onChange={(e) => {
              if (e !== null) {
                addDataRow.subGroup = e.value;
                addDataRow.subGroupTable = e.label;
              }
            }}
            defaultValue={{ value: "subGroup", label: "Подгруппа" }}
            options={subGroup}
            formatOptionLabel={({ label }) => (
              <div className="fast-option-custom" title={label}>
                {label}
              </div>
            )}
          />
          <Select
            className=""
            placeholder="Выберите неделю"
            onChange={(e) => {
              if (e !== null) {
                addDataRow.weekType = e.value;
                addDataRow.weekTypeTable = e.label;
              }
            }}
            defaultValue={{ value: "week", label: "Неделя" }}
            options={weekType}
            formatOptionLabel={({ label }) => (
              <div className="fast-option-custom" title={label}>
                {label}
              </div>
            )}
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
                // props.editTimetableThunk(props.timetable);
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
          <button onClick={props.closeModal}>Закрыть</button>
        </div>
      </Modal>
    </>
  );
};

export default ModalMain;

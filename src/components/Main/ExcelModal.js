import { useState, useRef, useEffect } from "react";
import Select from "react-select-virtualized";
import MultiSelect from "react-select";
import Modal from "react-modal";
import sprite from "../../images/cross.svg";

const ExcelModal = (props) => {
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [dateFromExcel, setDateFromExcel] = useState("");
  const [dateToExcel, setDateToExcel] = useState("");
  const [groupsIds, setGroupsIds] = useState("");
  const [groupsNames, setGroupsNames] = useState("");
  const [sessionType, setSessionType] = useState("");
  const courses = [1, 2, 3, 4, 5];
  const zfGroup = props.group.filter((m) => m.facultyName === "ЗФ");
  const ochFaculty = props.faculty.filter((m) => m.shortName !== "ЗФ");
  const sessionTypes = ["Установочная", "Онлайн", ""];

  return (
    <>
      <Modal
        ariaHideApp={false}
        className={"modal-window"}
        isOpen={props.ExcelModalIsOpen}
        onRequestClose={props.ExcelCloseModal}
        contentLabel="Excel Modal"
        overlayClassName={"modal_open"}
      >
        <div className="excel-div">
          <div>
            <div className="excel-dates">
              <input
                type="date"
                className="semester-date"
                defaultValue={dateFromExcel}
                onChange={(e) => {
                  setDateFromExcel(e.target.value);
                }}
              ></input>
              <input
                type="date"
                className="semester-date"
                defaultValue={dateToExcel}
                onChange={(e) => {
                  setDateToExcel(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="excels-div">
            <div className="full-time-div">
              <span className="excelTitle">Очное</span>
              <Select
                className="control-select"
                placeholder="Выберите факультет"
                onChange={(e) => {
                  if (e !== null) {
                    setFaculty(e.label);
                    setFacultyId(e.value);
                  }
                }}
                options={ochFaculty.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                formatOptionLabel={({ label }) => (
                  <div className="fast-option-custom" title={label}>
                    {label}
                  </div>
                )}
              />
              <Select
                className="control-select"
                placeholder="Выберите курс"
                onChange={(e) => {
                  if (e !== null) {
                    setCourse(e.value);
                  }
                }}
                options={courses.map((item) => ({
                  value: item,
                  label: item.toString(),
                }))}
                formatOptionLabel={({ label }) => (
                  <div className="fast-option-custom" title={label}>
                    {label}
                  </div>
                )}
              />
              <button
                className="control-button"
                onClick={props.getExcelScheduleThunk(
                  facultyId,
                  course,
                  faculty,
                  dateFromExcel,
                  dateToExcel
                )}
              >
                Скачать
              </button>
            </div>
            <div className="vertical-line"></div>
            <div className="correspondence-time-div">
              <span className="excelTitle">Заочное</span>
              <MultiSelect
                className=""
                isMulti
                placeholder="Выберите группу"
                onChange={(e) => {
                  const selectedValues = e.map((option) => option.value);
                  setGroupsIds(selectedValues.join(","));
                  const selectedLabels = e.map((option) => option.label);
                  setGroupsNames(selectedLabels.join(","));
                }}
                options={zfGroup.map((m) => ({
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
                placeholder="Выберите тип сессии"
                onChange={(e) => {
                  setSessionType(e.value);
                }}
                options={sessionTypes.map((m) => ({
                  value: m,
                  label: m,
                }))}
                formatOptionLabel={({ label }) => (
                  <div className="fast-option-custom" title={label}>
                    {label}
                  </div>
                )}
              />
              <button
                className="control-button"
                onClick={props.getExcelScheduleZfThunk(
                  groupsIds,
                  sessionType,
                  dateFromExcel,
                  dateToExcel,
                  groupsNames
                )}
              >
                Скачать
              </button>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button className="btn-close" onClick={props.ExcelCloseModal}>
              <div className="svg-block">
                <svg className="cross" width={20} height={20} fill="#fff">
                  <use xlinkHref={`${sprite}#cross`} />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ExcelModal;

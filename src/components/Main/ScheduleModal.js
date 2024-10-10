import { useState } from "react";
import MultiSelect from "react-select";
import Modal from "react-modal";
import sprite from "../../images/cross.svg";

const ScheduleModal = (props) => {
  const [dateFromExcel, setDateFromExcel] = useState("");
  const [dateToExcel, setDateToExcel] = useState("");
  const [teachersIds, setTeachersIds] = useState("");

  return (
    <>
      <Modal
        ariaHideApp={false}
        className={"modal-window"}
        isOpen={props.ScheduleModalIsOpen}
        onRequestClose={props.ScheduleCloseModal}
        contentLabel="Schedule Modal"
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
            <div className="correspondence-time-div" style={{ gap: "30px" }}>
              <MultiSelect
                className=""
                isMulti
                placeholder="Выберите преподавателя"
                onChange={(e) => {
                  const selectedValues = e.map((option) => option.value);
                  setTeachersIds(selectedValues.join(","));
                }}
                options={props.teacher.map((m) => ({
                  value: m.id,
                  label: `${m.surname} ${m.name} ${m.patronymic}`,
                }))}
                formatOptionLabel={({ label }) => (
                  <div className="fast-option-custom" title={label}>
                    {label}
                  </div>
                )}
              />
              <button
                className="control-button"
                onClick={props.getScheduleThunk(
                  teachersIds,
                  dateFromExcel,
                  dateToExcel
                )}
              >
                Скачать
              </button>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button className="btn-close" onClick={props.ScheduleCloseModal}>
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

export default ScheduleModal;

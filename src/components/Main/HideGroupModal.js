import { useState } from "react";
import Select from "react-select-virtualized";
import Modal from "react-modal";
import sprite from "../../images/cross.svg";

const HideGroupModal = (props) => {
  const [groupId, setGroupId] = useState("");
  const [hide, setHide] = useState("");
  const hideGroup = [
    { name: "Скрыть", value: false },
    { name: "Открыть", value: true },
  ];

  return (
    <>
      <Modal
        ariaHideApp={false}
        className={"modal-window"}
        isOpen={props.HideGroupModalIsOpen}
        onRequestClose={(e) => {
          props.HideGroupCloseModal(e);
          setHide("");
          setGroupId("");
        }}
        contentLabel="Hide Group Modal"
        overlayClassName={"modal_open"}
      >
        <div className="hide-group">
          <div className="hide-group-div">
            <Select
              className="control-select"
              placeholder="Выберите группу"
              onChange={(e) => {
                if (e !== null) {
                  setGroupId(e.value);
                } else {
                  setGroupId("");
                }
              }}
              options={props.group.map((item) => ({
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
              placeholder="Выберите действие"
              onChange={(e) => {
                if (e !== null) {
                  setHide(e.value);
                } else {
                  setHide("");
                }
              }}
              options={hideGroup.map((item) => ({
                value: item.value,
                label: item.name,
              }))}
              formatOptionLabel={({ label }) => (
                <div className="fast-option-custom" title={label}>
                  {label}
                </div>
              )}
            />
            <button
              className="control-button"
              disabled={
                hide === "" ? true : false || groupId === "" ? true : false
              }
              onClick={() => {
                props.HideGroupThunk(groupId, hide);
                setTimeout(() => {
                  props.getHiddenGroupsThunk();
                }, 100);
              }}
            >
              {!hide ? "Скрыть" : "Открыть"}
            </button>
          </div>
          <label className="hidden-groups">Скрытые группы</label>
          <div className="all-hide-groups">
            {props.hiddenGroups.map((item) => {
              return (
                <span className="hide-group-item" key={item}>
                  {item}
                </span>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            {/* <button
              className="control-button"
              onClick={() => {
                props.getHiddenGroupsThunk();
              }}
            >
              Скрытые группы
            </button> */}
            <button
              className="btn-close"
              onClick={(e) => {
                props.HideGroupCloseModal(e);
                setGroupId("");
                setHide("");
              }}
            >
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

export default HideGroupModal;

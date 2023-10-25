import { useState, useMemo, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "../App/App.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

import { getTimetableThunk } from "../../redux/actions/mainThunks";
import { connect } from "react-redux";
import ModalMain from "./ModalMain";
const Main = (props) => {
  // let [rowData, setRowData] = useState([
  //   {
  //     id: 596,
  //     updated: "2023-10-20T10:10:19.5240294",
  //     roomNumber: "101",
  //     subGroup: 2,
  //     day: 0,
  //     lessonNumber: 2,
  //     frame: "FOURTH",
  //     roomType: "LECTURE",
  //     disciplineName: "Высшая математика",
  //     teacherFullName: "Никонова Татьяна Викторовна",
  //     weekType: "ALWAYS",
  //     group: "А-36",
  //     roomId: 83,
  //     lessonId: 596,
  //     disciplineId: 67,
  //     teacherId: 253,
  //     groupId: 281,
  //   },
  //   {
  //     id: 601,
  //     updated: "2023-10-20T10:10:19.5240294",
  //     roomNumber: "101",
  //     subGroup: 2,
  //     day: 0,
  //     lessonNumber: 2,
  //     frame: "FOURTH",
  //     roomType: "LECTURE",
  //     disciplineName: "Математика",
  //     teacherFullName: "Никонова Татьяна Викторовна",
  //     weekType: "ALWAYS",
  //     group: "Тм-35",
  //     roomId: 83,
  //     lessonId: null,
  //     disciplineId: 215,
  //     teacherId: 253,
  //     groupId: 284,
  //   },
  //   {
  //     id: 601,
  //     updated: "2023-10-20T10:10:19.5240294",
  //     roomNumber: "101",
  //     subGroup: 2,
  //     day: 0,
  //     lessonNumber: 2,
  //     frame: "FOURTH",
  //     roomType: "LECTURE",
  //     disciplineName: "Математика",
  //     teacherFullName: "Никонова Татьяна Викторовна",
  //     weekType: "ALWAYS",
  //     group: "Тм-35",
  //     roomId: 83,
  //     lessonId: null,
  //     disciplineId: 215,
  //     teacherId: 253,
  //     groupId: 284,
  //   },
  //   {
  //     id: 597,
  //     updated: "2023-10-20T10:10:19.5240294",
  //     roomNumber: "101",
  //     subGroup: 2,
  //     day: 0,
  //     lessonNumber: 3,
  //     frame: "FOURTH",
  //     roomType: "LECTURE",
  //     disciplineName: "Высшая математика",
  //     teacherFullName: "Никонова Татьяна Викторовна",
  //     weekType: "ALWAYS",
  //     group: "А-36",
  //     roomId: 83,
  //     lessonId: 597,
  //     disciplineId: 67,
  //     teacherId: 253,
  //     groupId: 281,
  //   },
  //   {
  //     id: 601,
  //     updated: "2023-10-20T10:10:19.5240294",
  //     roomNumber: "101",
  //     subGroup: 2,
  //     day: 0,
  //     lessonNumber: 2,
  //     frame: "FOURTH",
  //     roomType: "LECTURE",
  //     disciplineName: "Математика",
  //     teacherFullName: "Никонова Татьяна Викторовна",
  //     weekType: "ALWAYS",
  //     group: "Тм-35",
  //     roomId: 83,
  //     lessonId: null,
  //     disciplineId: 215,
  //     teacherId: 253,
  //     groupId: 284,
  //   },
  //   {
  //     id: 601,
  //     updated: "2023-10-20T10:10:19.5240294",
  //     roomNumber: "101",
  //     subGroup: 2,
  //     day: 0,
  //     lessonNumber: 2,
  //     frame: "FOURTH",
  //     roomType: "LECTURE",
  //     disciplineName: "Математика",
  //     teacherFullName: "Никонова Татьяна Викторовна",
  //     weekType: "ALWAYS",
  //     group: "Тм-35",
  //     roomId: 83,
  //     lessonId: 601,
  //     disciplineId: 215,
  //     teacherId: 253,
  //     groupId: 284,
  //   },
  // ]);

  const [columnDefs] = useState([
    { field: "frameTable", rowGroup: true, hide: true, headerName: "Корпус" },
    {
      field: "roomNumberTable",
      rowGroup: true,
      hide: true,
      headerName: "Аудитория",
    },
    {
      field: "dayTable",
      rowGroup: true,
      hide: true,
      headerName: "День",
    },
    { field: "lessonNumberTable", headerName: "Время" },
    { field: "disciplineName", headerName: "Дисциплина" },
    { field: "lessonTypeTable", headerName: "Тип" },
    { field: "teacherFullName", headerName: "Преподаватель" },
    { field: "group", headerName: "Группа" },
    { field: "subGroupTable", headerName: "Подгруппа" },
    { field: "weekTypeTable", headerName: "Неделя" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      minWidth: 100,
      sortable: true,
      resizable: true,
      cellStyle: (params) => {
        if (
          params.colDef &&
          params.colDef.field &&
          params.colDef.field !== "roomNumber" &&
          params.colDef.field !== "day"
        ) {
          return { color: "white" };
        }
        return null;
      },
    };
  }, []);

  const getRowStyle = useCallback((params) => {
    console.log(params);
    if (params.data && params.data.lessonId !== null) {
      return { background: "red" };
    } else if (params.data && params.data.lessonId === null) {
      return { background: "green" };
    } else if (
      params.colDef &&
      params.colDef.field &&
      params.colDef.field === "roomNumber" &&
      params.colDef.field === "day"
    ) {
      return { background: "white", textColor: "black" };
    }
  }, []);

  const gridOptions = useMemo(() => {
    return {
      getRowStyle: getRowStyle,
      groupDefaultExpanded: 2,
      defaultColDef: defaultColDef,
      groupDisplayType: "multipleColumns",
      animateRows: true,
      rowSelection: "single",
    };
  }, [getRowStyle]);

  const onGridReady = useCallback(() => {
    props.getTimetableThunk();
  }, []);

  const handleRowClicked = (data) => {
    const dataRow = data.data;
    console.log(dataRow);
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <ModalMain
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
      ></ModalMain>
      <div
        className="ag-theme-alpine"
        style={{
          height: "100vh",
          width: "100vw",
          margin: "auto",
        }}
      >
        {console.log(props.timetable)}
        <AgGridReact
          rowData={props.timetable}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          onGridReady={onGridReady}
          onRowClicked={handleRowClicked}
          onRowDoubleClicked={openModal}
        ></AgGridReact>
      </div>
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    timetable: state.mainPage.timetable,
  };
};
const mapDispatchToProps = {
  getTimetableThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

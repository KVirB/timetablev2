import React, { useState, useMemo, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "../App/App.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import {
  getTimetableThunk,
  getDisciplineThunk,
} from "../../redux/actions/mainThunks";
import { connect } from "react-redux";
import ModalMain from "./ModalMain";
const Main = (props) => {
  const [columnDefs] = useState([
    {
      field: "frameTable",
      rowGroup: true,
      hide: true,
      headerName: "Корпус",
    },
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
  const [dataRow, setDataRow] = useState();
  const [gridApi, setGridApi] = useState(null);
  const [filterText, setFilterText] = useState("");
  const handleFilterChange = useCallback((e) => {
    setFilterText(e.target.value);
  }, []);
  useEffect(() => {
    if (gridApi) {
      gridApi.setQuickFilter(filterText);
    }
  }, [filterText, gridApi]);
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
    if (params.data && params.data.lessonId !== null) {
      return { background: "red" };
    } else if (params.data && params.data.lessonId === null) {
      return { background: "green" };
    } else if (
      params.colDef &&
      params.colDef.field &&
      (params.colDef.field === "roomNumber" || params.colDef.field === "day")
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
  }, [getRowStyle, defaultColDef]);
  const onGridReady = useCallback(
    (params) => {
      props.getTimetableThunk();
      props.getDisciplineThunk();
      setGridApi(params.api);
    },
    [props]
  );
  const handleRowClicked = (data) => {
    setDataRow(data.data);
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
        dataRow={dataRow}
        discipline={props.discipline}
      ></ModalMain>
      <div
        className="ag-theme-alpine"
        style={{
          height: "calc(100vh - 150px)",
          width: "100vw",
          margin: "auto",
        }}
      >
        <input
          type="text"
          value={filterText}
          onChange={handleFilterChange}
          placeholder="Фильтр"
        />

        <AgGridReact
          rowData={props.timetable}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          onGridReady={onGridReady}
          onRowClicked={handleRowClicked}
          onRowDoubleClicked={dataRow && openModal}
          suppressHorizontalScroll={true}
        ></AgGridReact>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    timetable: state.mainPage.timetable,
    discipline: state.mainPage.discipline,
  };
};
const mapDispatchToProps = {
  getTimetableThunk,
  getDisciplineThunk,
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

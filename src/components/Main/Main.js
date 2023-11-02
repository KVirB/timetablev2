import React, { useState, useMemo, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "../App/App.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import {
  getTimetableThunk,
  getDisciplineThunk,
  getTeacherThunk,
  getGroupThunk,
  updateTimetableThunk,
  editTimetableThunk,
} from "../../redux/actions/mainThunks";
import { connect } from "react-redux";
import ModalMain from "./ModalMain";

const dayComparator = (valueA, valueB) => {
  const daysOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  const indexA = daysOfWeek.indexOf(valueA);
  const indexB = daysOfWeek.indexOf(valueB);

  return indexA - indexB;
};

const timeComparator = (valueA, valueB) => {
  const timeOfLesson = [
    "8:00",
    "9:50",
    "11:40",
    "14:00",
    "15:45",
    "17:30",
    "19:15",
    " ",
  ];

  const indexA = timeOfLesson.indexOf(valueA);
  const indexB = timeOfLesson.indexOf(valueB);

  return indexA - indexB;
};

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
      comparator: dayComparator,
    },
    {
      field: "lessonNumberTable",
      headerName: "Время",
      comparator: timeComparator,
      defaultSort: "asc",
    },
    { field: "disciplineName", headerName: "Дисциплина" },
    { field: "lessonTypeTable", headerName: "Тип" },
    { field: "teacherFullName", headerName: "Преподаватель" },
    { field: "group", headerName: "Группа" },
    { field: "subGroupTable", headerName: "Подгруппа" },
    { field: "weekTypeTable", headerName: "Неделя" },
  ]);
  const [dataRow, setDataRow] = useState();
  const [maxId, setMaxId] = useState();
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
      sortingOrder: ["asc", "desc"],
      resizable: true,
    };
  }, []);
  const getRowStyle = useCallback((params) => {
    if (params.data && params.data.lessonId !== null) {
      return { background: "#FF8484" };
    } else if (params.data && params.data.lessonId === null) {
      return { background: "#83CF55" };
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
      props.getTeacherThunk();
      props.getGroupThunk();
      setGridApi(params.api);
    },
    [props]
  );
  const handleRowClicked = (data) => {
    setDataRow(data.data);
    const maxId = props.timetable.reduce((max, obj) => {
      return obj.id > max ? obj.id : max;
    }, 0);
    setMaxId(maxId);
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
      {console.log(props.timetable, "store")}
      <ModalMain
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        dataRow={dataRow}
        discipline={props.discipline}
        teacher={props.teacher}
        group={props.group}
        typeOfLesson={props.typeOfLesson}
        updateTimetableThunk={props.updateTimetableThunk}
        timetable={props.timetable}
        editTimetableThunk={props.editTimetableThunk}
        maxId={maxId}
        setDataRow={setDataRow}
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
          placeholder="Поиск"
        />
        <button
          onClick={() => {
            props.getTimetableThunk();
          }}
        >
          bimba
        </button>
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
    teacher: state.mainPage.teacher,
    group: state.mainPage.group,
    typeOfLesson: state.mainPage.typeOfLesson,
  };
};
const mapDispatchToProps = {
  getTimetableThunk,
  getDisciplineThunk,
  getTeacherThunk,
  getGroupThunk,
  updateTimetableThunk,
  editTimetableThunk,
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

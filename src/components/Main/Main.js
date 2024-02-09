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
  getFacultiesThunk,
  getExcelScheduleThunk,
  deleteScheduleRowThunk,
  getRoomsThunk,
} from "../../redux/actions/mainThunks";
import { connect } from "react-redux";
import ModalMain from "./ModalMain";
import Select from "react-select-virtualized";
import { Toaster } from "react-hot-toast";

const frameComparator = (valueA, valueB) => {
  const frame = ["1Корпус", "2Корпус", "4Корпус", "5Корпус", "Неизвестно"];
  const indexA = frame.indexOf(valueA);
  const indexB = frame.indexOf(valueB);
  return indexA - indexB;
};
const weekComparator = (valueA, valueB) => {
  const week = [
    "Первая",
    "Вторая",
    "Третья",
    "Четвертая",
    "Числитель",
    "Знаменатель",
    "Всегда",
  ];
  const indexA = week.indexOf(valueA);
  const indexB = week.indexOf(valueB);
  return indexA - indexB;
};
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
const courses = [1, 2, 3, 4, 5];

const Main = (props) => {
  const [columnDefs] = useState([
    {
      field: "frameTable",
      rowGroup: true,
      hide: true,
      headerName: "Корпус",
      comparator: frameComparator,
      sort: "asc",
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
      sort: "asc",
    },
    { field: "disciplineName", headerName: "Дисциплина" },
    { field: "lessonTypeTable", headerName: "Тип" },
    { field: "teacherFullName", headerName: "Преподаватель" },
    { field: "group", headerName: "Группа" },
    { field: "subGroupTable", headerName: "Подгруппа" },
    {
      field: "weekTypeTable",
      headerName: "Неделя",
      comparator: weekComparator,
      sort: "asc",
    },
    {
      field: "startDate",
      headerName: "С",
    },
    {
      field: "endDate",
      headerName: "По",
    },
  ]);
  const [dataRow, setDataRow] = useState();
  const [maxId, setMaxId] = useState();
  const [gridApi, setGridApi] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const handleFilterChange = useCallback((e) => {
    setFilterText(e.target.value);
  }, []);
  useEffect(() => {
    if (gridApi) {
      gridApi.setQuickFilter(filterText);
    }
  }, [filterText, gridApi]);
  useEffect(() => {
    props.getTimetableThunk();
    props.getFacultiesThunk();
  }, []);
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
      // if (props.timetable.length === 0) {
      props.getDisciplineThunk();
      props.getTeacherThunk();
      props.getGroupThunk();
      props.getRoomsThunk();
      setGridApi(params.api);
      // }
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
    setDataRow();
  };
  if (props.timetable && props.timetable.length !== 0) {
    return (
      <>
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
          rooms={props.rooms}
        ></ModalMain>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{ marginTop: "100px" }}
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#434c63",
              color: "#fff",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <div className="controls-container">
          <div className="controls-container-inputs">
            <input
              className="control-input-search"
              type="text"
              value={filterText}
              onChange={handleFilterChange}
              placeholder="Поиск"
            />
          </div>
          <div className="controls-container-inputs">
            <Select
              className="control-select"
              placeholder="Выберите факультет"
              onChange={(e) => {
                if (e !== null) {
                  setFaculty(e.label);
                  setFacultyId(e.value);
                }
              }}
              defaultValue={{ value: "faculty", label: "Факультет" }}
              options={props.faculty.map((item) => ({
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
              defaultValue={{ value: "course", label: "Курс" }}
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
              onClick={getExcelScheduleThunk(facultyId, course, faculty)}
            >
              Excel
            </button>
          </div>
          <div className="controls-button">
            <button
              className="control-button"
              onClick={() => {
                props.deleteScheduleRowThunk(dataRow.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <div
          className="ag-theme-alpine"
          style={{
            height: "calc(100vh - 158px)",
            width: "100vw",
            margin: "auto",
          }}
        >
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
  } else {
    return (
      <div class="loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    timetable: state.mainPage.timetable,
    discipline: state.mainPage.discipline,
    teacher: state.mainPage.teacher,
    group: state.mainPage.group,
    typeOfLesson: state.mainPage.typeOfLesson,
    faculty: state.mainPage.faculty,
    rooms: state.mainPage.rooms,
  };
};
const mapDispatchToProps = {
  getTimetableThunk,
  getDisciplineThunk,
  getTeacherThunk,
  getGroupThunk,
  updateTimetableThunk,
  editTimetableThunk,
  getFacultiesThunk,
  getExcelScheduleThunk,
  deleteScheduleRowThunk,
  getRoomsThunk,
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

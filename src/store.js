import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import mainReducer from "./redux/reducers/mainReducer";

const rootReducer = combineReducers({
  mainPage: mainReducer,
});

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware)
    // ,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import { metronic } from "../../_metronic";
import tabsReducer from "./reducers/tabsReducer";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
  tabs: tabsReducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}

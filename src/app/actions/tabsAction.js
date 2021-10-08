import { v4 as uuidv4 } from "uuid";
import {
  ADD_NEW_TAB,
  REMOVE_TAB,
  ACTIVE_TAB,
  SET_UNACTIVE_TAB_STATE,
} from "../constants/storeTypes";

export const addTab = (data) => {
  return {
    type: ADD_NEW_TAB,
    payload: {
      id: uuidv4(),
      ...data,
    },
  };
};

export const removeTab = (tabs) => {
  return {
    type: REMOVE_TAB,
    payload: tabs,
  };
};

export const setActiveTab = (tab) => {
  return {
    type: ACTIVE_TAB,
    payload: tab,
  };
};

export const setTabState = (tabState) => {
  return {
    type: SET_UNACTIVE_TAB_STATE,
    payload: tabState,
  };
};

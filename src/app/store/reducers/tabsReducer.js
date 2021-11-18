import {
  ACTIVE_TAB,
  ADD_NEW_TAB,
  REMOVE_TAB,
  SET_UNACTIVE_TAB_STATE,
  SET_TAB_TITLE
} from "../../constants/storeTypes";

const initialState = {
  tabs: [],
  active: {},
  tabState: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NEW_TAB:
      return { ...state, tabs: [...state.tabs, payload] };
    case ACTIVE_TAB:
      return { ...state, active: payload };
    case REMOVE_TAB:
      return { ...state, tabs: [...payload] };
    case SET_UNACTIVE_TAB_STATE:
      return {
        ...state,
        tabState: { ...state.tabState, [payload.id]: payload },
      };
    case SET_TAB_TITLE:
      const index = state.tabs.findIndex((tab) => tab.id === payload.id);

      const tab = state.tabs[index];
      tab.title = `Fac: ${payload.title}`;

      state.tabs.splice(index, 1, tab);
      return { ...state, tabs: [...state.tabs] };

    default:
      return state;
  }
};

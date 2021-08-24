import FormActionTypes from './formList.types';

const INITIAL_STATE = {
  count: 0,
  forms: [],
};

const formListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FormActionTypes.SAVE:
      return {
        ...state,
        forms: [...state.forms, {
          id: state.count + 1,
          date: new Date().toISOString(),
          droppedItems: action.payload,
        }],
        count: state.count + 1,
      };

    case FormActionTypes.SAVE_BY_ID:
      return {
        ...state,
        forms: [...state.forms.filter(d => d.id !== action.payload.id), {
          ...state.forms.find(d => d.id === action.payload.id),
          droppedItems: action.payload.droppedItems,
        }],
      };
    default:
      return state;
  }
};

export default formListReducer;

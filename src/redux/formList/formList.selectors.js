import { createSelector } from 'reselect';

const selectForm = state => state.formList;

export const selectAllForms = createSelector(
  [selectForm],
  formList => formList.forms,
);
export const selectFormCount = createSelector(
  [selectForm],
  formList => formList.count,
);

import FormActionTypes from './formList.types';

const save = (items) => dispatch => {
    dispatch({
        type : FormActionTypes.SAVE,
        payload : items,
    });
    return Promise.resolve();
};
const saveById = (id, items) => dispatch => {
    dispatch({
        type : FormActionTypes.SAVE_BY_ID,
        payload : {
            id : id,
            droppedItems : items,
        },
    });
    return Promise.resolve();
};
export { save, saveById };

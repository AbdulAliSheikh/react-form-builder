import { TextareaAutosize } from '@material-ui/core';

export const Input = ({ nameAttr }) =>
    (<TextareaAutosize name={nameAttr} minRows={3}/>);


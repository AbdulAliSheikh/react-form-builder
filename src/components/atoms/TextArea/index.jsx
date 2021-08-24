import { TextareaAutosize } from '@material-ui/core';

export const TextArea = ({
  nameAttr,
  text,
  setText,
}) =>
  (
    <TextareaAutosize name={nameAttr} placeholder='Type here...' minRows={5}
                      onBlur={setText}>{text}</TextareaAutosize>
  );


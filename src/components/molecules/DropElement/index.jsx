import './DropElement.css';
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  OpenWith, Edit, Delete, LibraryAdd,
} from '@material-ui/icons';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Divider, Checkbox,
} from '@material-ui/core';
import {
  FileUploader, Input, Table, TextArea,
} from '../../atoms';

const DropElement = ({
  name,
  id,
  index,
  moveCard,
  cloneItem,
  deleteItem,
  options,
  setOptions,
}) => {
  const ref = useRef(null);
  const refDrag = useRef(null);
  const [open, setOpen] = useState(false);
  const {
    nameAttr,
    label,
    rows,
    columns,
    text,
  } = options;

  const setColumns = (i) => {
    setOptions(index, {
      ...options,
      columns: i,
    });
  };
  const setRows = (i) => {
    setOptions(index, {
      ...options,
      rows: i,
    });
  };

  const setText = (i) => {
    setOptions(index, {
      ...options,
      text: i.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const SwitchElement = ({
    name,
    nameAttr,
  }) => {
    switch (name) {
      case 'table':
        return (
          <Table
            nameAttr={nameAttr}
            rows={rows}
            columns={columns}
            setColumns={setColumns}
            setRows={setRows}
          />
        );
      case 'input':
        return <Input nameAttr={nameAttr} />;
      case 'checkbox':
        return <Checkbox nameAttr={nameAttr} color='primary' />;
      case 'text':
        return <TextArea nameAttr={nameAttr} text={text} setText={setText} />;
      case 'file':
        return <FileUploader nameAttr={nameAttr} />;
      case 'divider':
      default:
        return <Divider nameAttr={nameAttr} />;
    }
  };
  const SimpleDialog = (props) => {
    const {
      onClose,
      open,
    } = props;
    const [nameEdit, setNameEdit] = useState(nameAttr);
    const [labelEdit, setLabelEdit] = useState(label);
    const [rowEdit, setRowEdit] = useState(rows);
    const [columnEdit, setColumnEdit] = useState(columns);
    const handleClose = () => {
      onClose();
    };

    return (
      <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
        <DialogTitle id='simple-dialog-title' style={{ textTransform: 'capitalize' }}>
          <h3>{props.name}</h3>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs>
              <TextField
                id='outlined-basic'
                label='Name'
                variant='outlined'
                defaultValue={nameEdit}
                onChange={(e) => setNameEdit(e.target.value)}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id='outlined-basic'
                label='Label'
                variant='outlined'
                defaultValue={labelEdit}
                onChange={(e) => setLabelEdit(e.target.value)}
              />
            </Grid>
          </Grid>
          {(() => {
            switch (name) {
              case 'table':
              default:
                return (
                  <>
                    <Grid container spacing={3}>
                      <Grid item xs>
                        <TextField
                          type='number'
                          variant='outlined'
                          label='Rows'
                          defaultValue={rows}
                          onChange={(e) => setRowEdit(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs>
                        <TextField
                          type='number'
                          variant='outlined'
                          label='Columns'
                          defaultValue={columns}
                          onChange={(e) => setColumnEdit(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </>
                );
              case 'input':
                return <></>;
              case 'checkbox':
                return <></>;
              case 'text':
                return <></>;
              case 'file':
                return <></>;
              case 'divider':
                return <></>;
            }
          })()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' disableElevation>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOptions(index, {
                nameAttr: nameEdit,
                label: labelEdit,
                rows: parseInt(rowEdit),
                columns: parseInt(columnEdit),
                text,
              });
              handleClose();
            }}
            variant='contained'
            color='primary'
            disableElevation
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  const [{ handlerId }, drop] = useDrop({
    accept: 'elem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'elem',
    item: () => ({
      id,
      index,
      name,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  const transform = isDragging ? 'translate(0,0)' : '';
  drag(refDrag);
  drop(ref);
  preview(ref);

  return (
    <div className='drop-elem' ref={ref} style={{
      opacity,
      transform,
    }} data-handler-id={handlerId}>
      <SimpleDialog open={open} onClose={handleClose} name={name} />
      <div>
        <h2>{label}</h2>
        <SwitchElement name={name} nameAttr={nameAttr} />
      </div>
      <div className='edit-buttons'>
        <span className='edit-button' ref={refDrag}>
          <OpenWith />
        </span>
        <span className='edit-button'>
          <LibraryAdd onClick={() => cloneItem(id)} />
        </span>
        <span className='edit-button'>
          <Edit onClick={() => handleClickOpen()} />
        </span>
        <span className='edit-button'>
          <Delete onClick={() => deleteItem(id)} />
        </span>
      </div>
    </div>
  );
};
export default DropElement;

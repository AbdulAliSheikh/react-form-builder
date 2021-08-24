import { useDrag } from 'react-dnd';
import { CustomButton } from '../../atoms';
import { Box as MUIBox } from '@material-ui/core';

export const Box = (props) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: 'BOX',
    item: { name: props.name },
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <MUIBox ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div ref={drag}>
        <CustomButton>{props.children}</CustomButton>
      </div>
    </MUIBox>
  );
};

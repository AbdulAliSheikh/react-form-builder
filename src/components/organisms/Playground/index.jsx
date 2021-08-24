import './Playground.css';
import { SaveAlt } from '@material-ui/icons';
import { Box, Container } from '@material-ui/core';
import { useRef } from 'react';
import { Bucket } from '../../molecules';
import { CustomButton } from '../../atoms';

export const Playground = () => {
  const bucketRef = useRef(null);

  const save = () => {
    bucketRef.current.save();
  };
  return (
    <div className='playground'>
      <Container style={{ minHeight: '70vh' }}>
        <Bucket ref={bucketRef} />
      </Container>
      <Box display='flex' justifyContent='center'>
        <CustomButton style={{ border: 'none' }} onClick={save}><SaveAlt /> Save</CustomButton>
      </Box>
    </div>
  );
};


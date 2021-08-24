import './validate.css';
import { useSelector } from 'react-redux';
import { selectAllForms } from '../../redux/formList/formList.selectors';
import { useParams } from 'react-router-dom';
import { Container, Box, Grid, Button } from '@material-ui/core';
import { FileUploader, Input, Table } from '../../components/atoms';
import { Divider, Checkbox } from '@material-ui/core';

const ValidateView = () => {
  const forms = useSelector(selectAllForms);
  const { id } = useParams();
  const form = forms.find(d => d.id === parseInt(id));
  const droppedItems = form.droppedItems;

  return (
    <Container>
      <Box height='100vh' width='100%' display='flex' alignItems='center'>
        <Grid container spacing={10}>
          <Grid item md={8} style={{ paddingRight: '20px' }}>
            <h2>Preview</h2>
            <Box width='800px' className='validate-preview' height='500px' borderRadius='5px'
                 border='1px solid lightgray' boxSizing='border-box' padding='20px'
                 overflow='scroll'>
              {droppedItems.map(
                d => <RenderItem key={d.id} item={d} />,
              )}
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box>
              <h2>Data</h2>
              <Box width='100%' height='160px' borderRadius='5px' border='1px solid lightgray'>
              </Box>
              <h2>Errors</h2>
              <Box width='100%' height='100px' borderRadius='5px' border='1px solid lightgray'>
              </Box>
              <h2>Events</h2>
              <Box width='100%' height='100px' borderRadius='5px' border='1px solid lightgray'>
              </Box></Box>
          </Grid>
          <Button variant='contained' color='primary' disableElevation
                  style={{ marginTop: '15px' }}>Submit</Button>
        </Grid>
      </Box>
    </Container>
  );
};
const RenderItem = ({ item }) => {
  const name = item.name;
  const {
    nameAttr,
    rows,
    columns,
    text,
  } = item.options;

  const SwitchElement = () => {
    switch (name) {
      case 'table':
        return <Table nameAttr={nameAttr} rows={rows} columns={columns} />;
      case 'input':
        return <Input nameAttr={nameAttr} />;
      case 'checkbox':
        return <Checkbox nameAttr={nameAttr} />;
      case 'text':
        return <p>{text}</p>;
      case 'file':
        return <FileUploader nameAttr={nameAttr} />;
      case 'divider':
      default:
        return <Divider nameAttr={nameAttr} />;
    }
  };
  return (
    <Box className='drop-elem'>
      <h2>{item.options.label}</h2>
      <SwitchElement />
    </Box>
  );
};
export default ValidateView;

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { OpenWith, Cached } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import { Heading, Sidebar, CustomButton } from '../../components/atoms';
import { Box } from '../../components/molecules';
import { Playground } from '../../components/organisms';

const CreateView = () => {
  const { id } = useParams();
  return <>
    <DndProvider backend={HTML5Backend}>
      <Sidebar>
        <Link to={(id) ? '/validate/' + id : '/create'}>
          <CustomButton inverted onClick={() => {
            if (id) {
              return;
            } else {
              alert('You need to save the form before you can validate it.');
            }
          }}><Cached /> Validate</CustomButton>
        </Link>
        <Heading>Cell Layout</Heading>
        <Box name='table'><OpenWith /> Table</Box>
        <Heading>Form Components</Heading>
        <Box name='input'><OpenWith /> Input</Box>
        <Box name='checkbox'><OpenWith /> Checkbox</Box>
        <Box name='file'><OpenWith /> File Uploader</Box>
        <Box name='text'><OpenWith /> Text</Box>
        <Box name='divider'><OpenWith /> Divider</Box>
      </Sidebar>
      <Playground />
    </DndProvider>
  </>
}
export default CreateView;

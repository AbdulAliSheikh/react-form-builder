import { Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllForms } from '../../redux/formList/formList.selectors';
import { Heading, Sidebar } from '../../components/atoms';
import { NestedMenu, CustomButton } from '../../components/atoms';

const RootView = () => {

  const forms = useSelector(selectAllForms);
  const [activeDate, setActiveDate] = useState(null);
  const days = new Set([...forms.map(d => new Date(d.date).toLocaleDateString())]);

  return (<>
    <NestedMenu show={activeDate}>
      {forms.filter(({ date }) => new Date(date).toLocaleDateString() === activeDate)
        .map(
          ({ id }) => <Link to={'/create/' + id}><CustomButton
            date>Form {(id < 10) ? '0' + id : id}</CustomButton></Link>,
        )}
    </NestedMenu>
    <Sidebar>
      <Link to='/create'>
        <CustomButton inverted><Add />Create</CustomButton>
      </Link>
      <Heading>Forms</Heading>
      {
        Array.from(days)
          .map(d => <CustomButton date
                                  onClick={() => setActiveDate(d)}>{new Date(d).toDateString()}</CustomButton>)
      }
    </Sidebar>
  </>);
};
export default RootView;

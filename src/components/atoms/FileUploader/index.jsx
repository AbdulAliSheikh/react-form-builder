import { Publish } from '@material-ui/icons';

export const FileUploader = ({ nameAttr }) =>
  (<>
    <label htmlFor={nameAttr} style={{
      background: 'transparent',
      width: 'fit-content',
      border: '1px dashed #eaeaea',
      borderRadius: '50px',
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
    }}>
      <Publish /> Choose File
    </label>
    <input id={nameAttr} type='file' name={nameAttr} style={{ display: 'none' }} />
  </>);


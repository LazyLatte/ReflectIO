import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import tutorialLevelInfo from '../tutorialLevelInfo';

const btnStyles = {
  display:'flex',
  justifyContent:'flex-start',
  height: 100,
  width: '60%',
  minWidth: 600,
  borderRadius: '3px 0 0 3px',
  border: '2px solid',
  borderRight: 0,
  margin: '20px 0',
  paddingLeft: 5,
  color: '#F8F8FF',
  fontSize: 30,
  transition: 'width 400ms ease',
  '&:hover': {
    border: '2px solid',
    borderRight: 0,
    width: '62.5%',
    backgroundColor: '#181f31'
  }
}

const TutorialList = () => {
  return (
    <>
      {tutorialLevelInfo.map((levelInfo, idx) => (
        <Button variant="contained" sx={btnStyles} component={Link} to={`./${idx+1}`} state={{levelInfo}} key={idx}>
            {`${idx+1}. ${levelInfo.title}`}
        </Button>
      ))}
    </>
  );
}

export default TutorialList;
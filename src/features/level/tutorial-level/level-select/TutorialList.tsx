import Button from '@mui/material/Button';
import ToggledButton from '@features/ui/button/ToggledButton';
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
  fontSize: 30,
  transition: 'width 400ms ease',
  ':hover': {
    border: '2px solid',
    borderRight: 0,
    width: '62.5%',
    bgcolor: 'action.hover'
  }
}

const TutorialList = () => {
  return (
    <>
      {tutorialLevelInfo.map((levelInfo, idx) => (
        <ToggledButton color="contrast" sx={btnStyles} component={Link} to={`./${idx+1}`} state={{levelInfo}} key={idx}>
            {`${idx+1}. ${levelInfo.title}`}
        </ToggledButton>
      ))}
    </>
  );
}

export default TutorialList;
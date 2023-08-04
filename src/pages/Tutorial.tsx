import {FC} from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { tutorialLevels} from '@features/level';

const btnStyles = {
  display:'flex',
  justifyContent:'flex-start',
  height: 120,
  width: '60%',
  minWidth: 700,
  borderRadius: '3px 0 0 3px',
  border: '2px solid',
  borderRight: 0,
  margin: '35px 0',
  paddingLeft: 5,
  color: 'white',
  fontSize: 35,
  transition: 'width 400ms ease',
  '&:hover': {
    border: '2px solid',
    borderRight: 0,
    width: '62.5%',
    backgroundColor: '#181f31'
  }
}

const menu = {
  hidden: {x: '100vw', opacity: 0},
  visible: { x: 0, opacity: 1},
}

interface TutorialProps {};
const Tutorial: FC<TutorialProps> = () => {
  const titles = ['Reflector', 'Lens', 'Color Mix'];
  return (
    <motion.div
      variants={menu}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition= { {duration: 0.8 }}
      
      style={{
        position: 'absolute',
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: '64px'
      }}
    >
      {tutorialLevels.map((levelInfo, idx) => (
        <Button variant="contained" sx={btnStyles} component={Link} to={`./${idx+1}`} state={{levelInfo}} key={idx}>
            {titles[idx]}
        </Button>
      ))}
    </motion.div>
  );
}

export default Tutorial;
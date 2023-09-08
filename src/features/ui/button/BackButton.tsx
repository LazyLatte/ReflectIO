import {useLocation, useNavigate} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from '@mui/material/Button';
const BackButton = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <AnimatePresence initial={false}>
      {location.pathname !== '/' &&
        <motion.div
          initial={{x: '-100vw'}}
          animate={{ x: 0}}
          exit={{ x: '-100vw'}}
          transition= { {duration: 0.6 }}
          style={{
            alignSelf: 'start',
            position: 'absolute',
            top: '130px',
            left: '30px',
            zIndex: 99
          }}
        >
          <Button
            variant='contained'
            disableRipple
            disableFocusRipple
            sx={{
              height: '60px',
              width: '140px',
              backgroundColor: 'grey',
              backgroundImage: 'url(https://www.svgrepo.com/show/263908/back.svg)',
              backgroundSize: '100% 100%',
              border: 'solid black',
              
              '&:hover': {
                backgroundColor: 'grey',
              }
            }}
            onClick={() => navigate(-1)}
          />
        </motion.div>
        
      }
    </AnimatePresence>
  );
}

export default BackButton;
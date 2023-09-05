import {useRef, FC, memo} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { isAxiosError } from 'axios';
import { motion, AnimatePresence } from "framer-motion"
import {Link} from "react-router-dom";
import {UserLevelInfo} from '@features/level';
import { useDeleteLevel } from '../api/use-delete-level';
import { ReLoginModal, ReLoginModalHandle } from '@features/authentication';
import StarImg from '@images/icons/star.svg';
import HeartImg from '@images/icons/heart.svg';
interface LevelInfoCardProps {
  userLevelInfo: UserLevelInfo;
  isHovered: boolean;
  setHovered: (levelIdx?: number) => void;
}
const styles = {
  editButton: {
    height: '50px',
    width: '150px',
    border: '2px solid',
    color: 'gold',
    fontSize: '2rem',
    '& .MuiButton-endIcon svg': {
      fontSize: '30px'
    }
  },
  deleteButton: {
    height: '50px',
    width: '50px',
    minWidth: '50px',
    border: '2px solid',
    color: 'purple',
  }
}
export const LevelInfoCard: FC<LevelInfoCardProps> = ({userLevelInfo, isHovered, setHovered}) => {
  const {id, public: isPublic, clears, likes, record, creator, timestamp, personal_best, thumbnail} = userLevelInfo;
  const reLoginModalRef = useRef<ReLoginModalHandle>(null);
  const deleteLevelMutation = useDeleteLevel();
  //should have confirm modal
  const deleteLevel = () => {
    deleteLevelMutation.mutate({id}, {
      onSuccess: (data) => {},
      onError: (error) => {
        if(isAxiosError(error)){
          switch(error.response?.status){
            case 401:
              reLoginModalRef.current?.open();
              break;
            default:
              console.error(error);
              break;
          }
        }
      }
    })
  }
  return (
    <>
      <Box 
        height='100%' 
        width='100%'
        onMouseOver={() => setHovered()} 
        onMouseLeave={() => setHovered(-1)}
        sx={{
          position: 'relative',
          cursor: 'pointer'
        }}
      >
        <AnimatePresence>
          {isHovered 
            ?
              <motion.div 
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.8}}
                  style={{
                      position: 'absolute',
                      height: '95%', 
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                  }}
              >
                  <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' alignSelf='flex-start' fontSize='1.5rem' >
                      <img 
                          src={StarImg}
                          style={{
                              width: '60px',
                              height: '60px',
                              marginLeft: '20px',
                              marginRight: '20px'
                          }}
                      />
                      <span style={{fontFamily: ['Orbitron', 'sans-serif'].join(","), letterSpacing: '3px', color: '#b299e6'}}>{isPublic ? clears : '--'}</span>
                  </Box>
                  <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' alignSelf='flex-start' fontSize='1.5rem'>
                      <img 
                          src={HeartImg}
                          style={{
                              width: '60px',
                              height: '60px',
                              marginLeft: '20px',
                              marginRight: '20px'
                          }}
                      />
                      <span style={{fontFamily: ['Orbitron', 'sans-serif'].join(","), letterSpacing: '3px', color: '#b299e6'}}>{isPublic ? likes : '--'}</span>
                  </Box>
                  <Box display='flex' flexDirection='row' justifyContent='space-around' alignItems='center' width='90%'>
                      <Button variant="contained" endIcon={<EditIcon/>} sx={styles.editButton} component={Link} to='/custom' state={{userLevelInfo}}>Edit</Button>
                      <Button variant="contained" sx={styles.deleteButton} onClick={deleteLevel}><DeleteForeverIcon/></Button>
                  </Box>
              </motion.div>
            :
              <motion.img 
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.8}}
                  src={'data:image/png;base64,' + thumbnail} 
                  height='100%' 
                  width='100%'
              />
          } 
        </AnimatePresence>
        
      </Box>
      <ReLoginModal onLogin={()=>{}} ref={reLoginModalRef}/>  
   </>
  );
}


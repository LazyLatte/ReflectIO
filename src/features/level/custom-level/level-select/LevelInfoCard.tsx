import {useState, useRef, FC, memo} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { isAxiosError, isCancel } from 'axios';
import { motion, AnimatePresence } from "framer-motion"
import {Link} from "react-router-dom";
import {UserLevelInfo} from '@features/level';
import { useDeleteLevel } from '../api/use-delete-level';
import { ReLoginModal, ReLoginModalHandle } from '@features/authentication';
interface LevelInfoCardProps {
  userLevelInfo: UserLevelInfo;
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
export const LevelInfoCard: FC<LevelInfoCardProps> = ({userLevelInfo}) => {
  const {id, public: isPublic, clears, likes, record, creator, timestamp, personal_best, thumbnail} = userLevelInfo;
  const [hover, setOnHover] = useState<boolean>(false);
  const reLoginModalRef = useRef<ReLoginModalHandle>(null);
  const deleteLevelMutation = useDeleteLevel();
  const deleteLevel = () => {
    deleteLevelMutation.mutate({id}, {
      onSuccess: (data) => {
        
      },
      onError: (error) => {
        if(isCancel(error)){
          alert("Sign in to have your own level!");
        }else if(isAxiosError(error)){
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
        onMouseOver={() => setOnHover(true)} 
        onMouseLeave={() => setOnHover(false)}
        sx={{
          position: 'relative',
          cursor: 'pointer'
        }}
      >
        <AnimatePresence>
          {hover 
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
                          src={'https://www.svgrepo.com/show/434273/star.svg'}
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
                          src={'https://www.svgrepo.com/show/362109/heart.svg'}
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


import {useRef, FC} from 'react';
import Box from '@mui/material/Box';
import { isAxiosError } from 'axios';
import { AnimatePresence } from "framer-motion"
import { ReLoginModal, ReLoginModalHandle } from '@features/authentication';
import {UserLevelInfo} from '../..';
import ConfirmModal, {ConfirmModalHandle} from '../modals/ConfirmModal';
import useDeleteLevel from '../api/use-delete-level';
import Hovered from './hovered';
import Thumbnail from './thumbnail';
interface LevelInfoCardProps {
  userLevelInfo: UserLevelInfo;
  isHovered: boolean;
  setHovered: (levelIdx?: number) => void;
}

const LevelInfoCard: FC<LevelInfoCardProps> = ({userLevelInfo, isHovered, setHovered}) => {
  const {id, public: isPublic, clears, likes, record, creator, timestamp, personal_best, thumbnail, width} = userLevelInfo;
  const confirmModalRef = useRef<ConfirmModalHandle>(null);
  const reLoginModalRef = useRef<ReLoginModalHandle>(null);
  const deleteLevelMutation = useDeleteLevel();
  
  const onDelete = () => confirmModalRef.current?.open("DELETE THE LEVEL?", 200);
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
              <Hovered userLevelInfo={userLevelInfo} isPublic={isPublic} clears={clears} likes={likes} onDelete={onDelete}/>
            :
              <Thumbnail thumbnail={thumbnail} gridWidth={width}/>
          } 
        </AnimatePresence>
      </Box>
      <ConfirmModal onConfirm={deleteLevel} ref={confirmModalRef}/>
      <ReLoginModal onLogin={deleteLevel} ref={reLoginModalRef}/>  
   </>
  );
}

export default LevelInfoCard;

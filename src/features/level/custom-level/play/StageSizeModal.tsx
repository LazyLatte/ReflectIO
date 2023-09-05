import {forwardRef, useImperativeHandle, useState, useRef} from 'react';
import { isAxiosError, isCancel } from 'axios';
import Box from '@mui/material/Box';
import Silder from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


import { EmptyStage, EmptyStageHandle } from '@features/stage';
import { useCreateLevel } from '../api/use-post-level';
import { ReLoginModal, ReLoginModalHandle } from '@features/authentication';
import Modal, {ModalBox, ModalButton, ModalSeparator} from '@features/ui/modal';
const minSize = 8;
const maxSize = 12;
const defaultSize = 10;
const gridSize = 400;

interface StageSizeModalProps {};
export interface StageSizeModalHandle {
  open: () => void;
}
export const StageSizeModal = forwardRef<StageSizeModalHandle, StageSizeModalProps>(({}, ref) => {
  const createLevelMutation = useCreateLevel();
  const emptyStageRef = useRef<EmptyStageHandle>(null);
  const reLoginModalRef = useRef<ReLoginModalHandle>(null);
  const [size, setSize] = useState<number>(defaultSize);
  const [open, setOpen] = useState<boolean>(false);
  useImperativeHandle(ref, ()=>({
    open: () => {
      setOpen(true);
    }
  }))
  const closeModal = () => setOpen(false);
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
        setSize(newValue);
    }
  };
  const createLevel = () => {
    const uri = emptyStageRef.current?.getThumbnail() || '';
    createLevelMutation.mutate({height: size, width: size, thumbnail: uri.split(',')[1]}, {
      onSuccess: (data) => {
        closeModal();
      },
      onError: (error) => {
        if(isCancel(error)){
          closeModal();
        }else if(isAxiosError(error)){
          switch(error.response?.status){
            case 401:
              reLoginModalRef.current?.open();
              break;
            default:
              break;
          }
        }
      }
    })
  };
  return (
    <Modal open={open} onBackDropClick={closeModal}>
      <ModalBox height={600} width={550}>
        <Box display='flex' flexDirection='row' justifyContent='space-around' alignItems='center' width='100%'>
          <Box display='flex' flexDirection='column' justifyContent='space-around' alignItems='center'>
            <Typography sx={{
                position: 'relative',
                bottom: 8,
                fontFamily: ["Roboto","Helvetica","Arial", "sans-serif"].join(","),
                fontSize: 40,
                fontWeight: 'bold',
                color: '#00004d',
                letterSpacing: '2px',
              }}
            >
              {`${size} x ${size}`}
            </Typography>
            <EmptyStage size={size} cellWidth={gridSize / size} ref={emptyStageRef}/>
          </Box>
          <Silder 
              color="secondary" 
              orientation="vertical" 
              defaultValue={defaultSize} 
              min={minSize} 
              max={maxSize} 
              step={1} 
              onChange={handleChange} 
              sx={{
                  position: 'relative',
                  top: 15,
                  width: 15,
                  height: 200
              }}
          />
        </Box>
        <ModalSeparator/>
        <Box display='flex' flexDirection='row' justifyContent='space-around' alignItems='center' width='100%'>
          <ModalButton width='45%' disabled={false} onClick={closeModal}>Cancel</ModalButton>
          <ModalButton width='45%' disabled={false} onClick={createLevel}>Confirm</ModalButton>
        </Box>
      </ModalBox>
    <ReLoginModal onLogin={createLevel} ref={reLoginModalRef}/>
    </Modal>
  );
})
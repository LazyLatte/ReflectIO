import {useRef} from 'react';
import Button from '@mui/material/Button';
import useColorMode from 'src/hooks/useColorMode';
import PlusImg from '@images/icons/plus.svg';
import StageSizeModal, { StageSizeModalHandle } from '../modals/StageSizeModal';

const AddLevelButton = () => {
  const {colorMode} = useColorMode();
  const stageSizeModalRef = useRef<StageSizeModalHandle>(null);
  const handleOnClick = () => stageSizeModalRef.current?.open();
  return (
    <>
        <Button 
            onClick={handleOnClick} 
            sx={{
                height: '100%',
                width: '100%',
                padding: 0,
                ':hover': {
                    bgcolor: colorMode === 'dark' ? '#1b253d' : 'primary.dark'
                }
            }}
        >
            <img src={PlusImg} height='100%' width='100%'/>
        </Button>
        <StageSizeModal ref={stageSizeModalRef}/>
    </>
  )
}

export default AddLevelButton;
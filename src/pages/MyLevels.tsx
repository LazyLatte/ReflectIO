import {useRef, FC, ReactNode, useEffect} from 'react';
import { isCancel, isAxiosError } from 'axios';
import MotionPage from './MotionPage';
import { ClipLoader } from 'react-spinners';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CustomLevelInfoCard, StageSizeModal, StageSizeModalHandle } from '@features/level';
import { useGetUserLevels } from '@features/level/custom-level/api/use-get-levels';
import PlusImg from '@images/icons/plus.svg';

const styles = {
  btn: {
    height: '100%',
    width: '100%',
    padding: 0,
    '&:hover': {
      backgroundColor: '#141b2d'
    }
  }
}
const myLevelsShape = {height: 2, width: 4};
interface DisplayCellProps {
  idx: number;
  levelNum: number;
  isPublic: boolean;
  children: (idx: number, levelNum: number) => ReactNode;
}

const DisplayCell: FC<DisplayCellProps> = ({idx, levelNum, isPublic, children}) => {
  const borderColor = isPublic ? 'gold' : 'pink';
  return (
    <Box height={250} width={250} flexShrink={0} margin={5}  border={`2px solid ${borderColor}`} boxShadow={`0 0 .2rem ${borderColor}`}>
      {children(idx, levelNum)}
    </Box>
  )
}

const MyLevels = () => {
  const {data: myLevels, isLoading, isError, error, remove} = useGetUserLevels();
  const myLevelsArray: null[][] = Array(myLevelsShape.height).fill(Array(myLevelsShape.width).fill(null));
  const stageSizeModalRef = useRef<StageSizeModalHandle>(null);
  const handleOnClick = () => {
    stageSizeModalRef.current?.open();
  }
  useEffect(()=>{
    if(isError){
      if(isCancel(error)){
        remove();
      }
    }
  }, [isError])
  return (
    <MotionPage transitionType='slide' style={{paddingTop: '150px', justifyContent: 'center',alignItems: 'center'}}>
      <Box border='2px solid white' boxShadow='0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 1rem #fff' borderRadius={3}>
        {myLevelsArray.map((row, i)=>(
          <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' key={i}>
            {row.map((_, j)=>{
              const idx = i*myLevelsShape.width+j;
              const levelNum = myLevels?.length || 0;
              const isPublic = myLevels!==undefined && idx < myLevels.length && myLevels[idx].public;
              return (
                <DisplayCell idx={idx} levelNum={levelNum} isPublic={isPublic} key={idx}>
                  {(idx, levelNum) => {
                    if(isLoading) return <ClipLoader color={'green'} loading={true} size={250} aria-label="Loading Spinner" data-testid="loader"/> 
                    if(idx < levelNum) return <CustomLevelInfoCard userLevelInfo={myLevels![idx]}/>
                    if(idx === levelNum) return (
                      <Button onClick={handleOnClick} sx={styles.btn}>
                        <img src={PlusImg} style={{height: '100%', width: '100%'}}/>
                      </Button>
                    )
                    return null;
                  }}  
                </DisplayCell>
              )
            })}
          </Box>
        ))}
      </Box>
      <StageSizeModal ref={stageSizeModalRef}/>
    </MotionPage>
      
  )
}

export default MyLevels;

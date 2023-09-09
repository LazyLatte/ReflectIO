import {useRef, FC, ReactNode, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MotionPage from './MotionPage';
import useColorMode from 'src/hooks/useColorMode';
import { ClipLoader } from 'react-spinners';
import { CustomLevelInfoCard, StageSizeModal, StageSizeModalHandle, useGetUserLevels } from '@features/level/custom-level';
import PlusImg from '@images/icons/plus.svg';

const myLevelsShape = {height: 2, width: 4};
interface DisplayCellProps {
  idx: number;
  levelNum: number;
  borderColor: string;
  children: (idx: number, levelNum: number) => ReactNode;
}

const DisplayCell: FC<DisplayCellProps> = ({idx, levelNum, borderColor, children}) => {
  return (
    <Box height={250} width={250} flexShrink={0} margin={5}  border={`3px solid ${borderColor}`}>
      {children(idx, levelNum)}
    </Box>
  )
}

const MyLevels = () => {
  const {colorMode} = useColorMode()!;
  const {data: myLevels, isLoading} = useGetUserLevels();
  const [hoverIdx, setHoverIdx] = useState(-1);
  const myLevelsArray: null[][] = Array(myLevelsShape.height).fill(Array(myLevelsShape.width).fill(null));
  const stageSizeModalRef = useRef<StageSizeModalHandle>(null);
  const handleOnClick = () => stageSizeModalRef.current?.open();
  
  return (
    <MotionPage transitionType='slide' style={{paddingTop: '150px', alignItems: 'center'}}>
      <Box border='2px solid' borderRadius={3} boxShadow='0 0 0.8rem' sx={{color: colorMode === 'dark' ? '#fff' : "#191970"}}>
        {myLevelsArray.map((row, i)=>(
          <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' key={i}>
            {row.map((_, j)=>{
              const idx = i*myLevelsShape.width+j;
              const levelNum = myLevels?.length || 0;
              const isPublic = myLevels!==undefined && idx < myLevels.length && myLevels[idx].public;
              const borderColorOptions = colorMode === 'dark' ? ['#FFC0CB', '#FFD700'] : ['#ff99aa', '#00FA9A']
              return (
                <DisplayCell idx={idx} levelNum={levelNum} borderColor={borderColorOptions[isPublic ? 1 : 0]} key={idx}>
                  {(idx, levelNum) => {
                    if(isLoading) return <ClipLoader color={'green'} loading={true} size={250} aria-label="Loading Spinner" data-testid="loader"/> 
                    if(idx < levelNum) return <CustomLevelInfoCard userLevelInfo={myLevels![idx]} isHovered={hoverIdx === idx} setHovered={(levelIdx: number = idx) => setHoverIdx(levelIdx)}/>
                    if(idx === levelNum) return (
                      <Button 
                        onClick={handleOnClick} 
                        sx={{
                          height: '100%',
                          width: '100%',
                          padding: 0,
                          ':hover': {
                            bgcolor: colorMode === 'dark' ? 'primary.light' : 'primary.dark'
                          }
                        }}
                      >
                        <img src={PlusImg} height='100%' width='100%'/>
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

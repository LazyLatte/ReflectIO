import {FC, ReactNode, useState} from 'react';
import Box from '@mui/material/Box';
import MotionPage from './MotionPage';
import useColorMode from 'src/hooks/useColorMode';
import { CustomLevelInfoCard, AddLevelButton, useGetUserLevels } from '@features/level/custom-level';

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

const myLevelsShape = {height: 2, width: 4};
const MyLevels = () => {
  const {colorMode} = useColorMode();
  const {data: myLevels} = useGetUserLevels();
  const [hoverIdx, setHoverIdx] = useState(-1);
  const myLevelsArray: null[][] = Array(myLevelsShape.height).fill(Array(myLevelsShape.width).fill(null));

  
  return (
    <MotionPage transitionType='slide' style={{paddingTop: '10vh', alignItems: 'center'}}>
      <Box border='2px solid' borderRadius={3} boxShadow='0 0 0.4rem' sx={{color: colorMode === 'dark' ? '#fff' : "#191970"}}>
        {myLevelsArray.map((row, i)=>(
          <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' key={i}>
            {row.map((_, j) => {
              const idx = i*myLevelsShape.width+j;
              const levelNum = myLevels?.length || 0;
              const isPublic = myLevels!==undefined && idx < myLevels.length && myLevels[idx].public;
              const borderColorOptions = colorMode === 'dark' ? ['#FFC0CB', '#FFD700'] : ['#DB7093', '#00FA9A']
              return (
                <DisplayCell idx={idx} levelNum={levelNum} borderColor={borderColorOptions[isPublic ? 1 : 0]} key={idx}>
                  {(idx, levelNum) => {
                    if(idx < levelNum) return <CustomLevelInfoCard userLevelInfo={myLevels![idx]} isHovered={hoverIdx === idx} setHovered={(levelIdx: number = idx) => setHoverIdx(levelIdx)}/>
                    if(idx === levelNum) return <AddLevelButton/>
                    return null;
                  }}  
                </DisplayCell>
              )
            })}
          </Box>
        ))}
      </Box>
    </MotionPage>
  )
}

export default MyLevels;

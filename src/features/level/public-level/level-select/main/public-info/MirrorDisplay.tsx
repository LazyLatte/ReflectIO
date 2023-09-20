import {FC} from 'react';
import Box from '@mui/material/Box';
import {MAX_MIRROR_NUM} from '@features/stage';
import ReflectorWhiteImg from '@images/mirrors/reflector-default-dark.png';
import LensWhiteImg from '@images/mirrors/lens-default-dark.png';

interface MirrorDisplayProps {reflectorNum: number, lensNum: number}
const MirrorDisplay: FC<MirrorDisplayProps> = ({reflectorNum, lensNum}) => {
  const mirrors: string[] = Array(reflectorNum).fill('reflector').concat(Array(lensNum).fill('lens')).concat(Array(MAX_MIRROR_NUM-reflectorNum-lensNum).fill(''));
  return (
    <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' padding='5px 0' border='solid #647cba 3px' borderRadius='5px' sx={{backgroundColor: '#1d2742'}}> 
      {mirrors.map((mirrorType, i) => (
        <Box width='50px' height='60px' key={i}>
          {mirrorType ? 
            <img src={mirrorType === 'reflector' ? ReflectorWhiteImg : LensWhiteImg} height='100%' width='100%'/>
          :
            <Box width='100%' height='100%'/>
          }
        </Box>
      ))}
    </Box>
  )
}

export default MirrorDisplay;
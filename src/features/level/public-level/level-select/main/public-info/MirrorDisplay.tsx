import {FC, useContext} from 'react';
import Box from '@mui/material/Box';
import {MAX_MIRROR_NUM, ObjectType} from '@features/stage';
import ImagesContext from '@contexts/ImagesProvider';

interface MirrorDisplayProps {reflectors: Color[], lenses: Color[]}
const MirrorDisplay: FC<MirrorDisplayProps> = ({reflectors, lenses}) => {
  const reflectorNum = reflectors.length;
  const lensNum = lenses.length;
  const mirrorTypeArray: (ObjectType.Reflector | ObjectType.Lens)[] = [...Array(reflectorNum).fill(ObjectType.Reflector), ...Array(lensNum).fill(ObjectType.Lens)];
  const mirrorColorArray: Color[] = [...reflectors, ...lenses];
  const {reflectorImages, lensImages} = useContext(ImagesContext)!;
  return (
    <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' padding='5px 0' border='solid #647cba 3px' borderRadius='5px' sx={{backgroundColor: '#1d2742'}}> 
      {Array(MAX_MIRROR_NUM).fill(null).map((_, i) => (
        <Box width='50px' height='60px' key={i}>
          {i < reflectorNum + lensNum ? 
            <img src={mirrorTypeArray[i] === ObjectType.Reflector ? reflectorImages[mirrorColorArray[i]]?.src : lensImages[mirrorColorArray[i]]?.src} height='100%' width='100%'/>
          :
            <Box width='100%' height='100%'/>
          }
        </Box>
      ))}
    </Box>
  )
}

export default MirrorDisplay;
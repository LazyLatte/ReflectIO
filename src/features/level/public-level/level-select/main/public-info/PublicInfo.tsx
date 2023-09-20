import {FC} from 'react';
import Box from '@mui/material/Box';
import ClearsAndLikes from './ClearsAndLikes';
import MirrorDisplay from './MirrorDisplay';
interface PublicInfoProps {reflectorNum: number, lensNum: number, clears: number, likes: number}
const PublicInfo: FC<PublicInfoProps> = ({reflectorNum, lensNum, clears, likes}) => {
  return (
    <Box display='flex' flex={1} height='200px' margin='0 20px' flexDirection='column' justifyContent='space-between' alignItems='flex-start' paddingTop='10px' paddingBottom='20px'>
      <ClearsAndLikes clears={clears} likes={likes}/>
      <MirrorDisplay reflectorNum={reflectorNum} lensNum={lensNum}/>
    </Box>
  )
}

export default PublicInfo;
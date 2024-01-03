import {FC} from 'react';
import Box from '@mui/material/Box';
import ClearsAndLikes from './ClearsAndLikes';
import MirrorDisplay from './MirrorDisplay';
interface PublicInfoProps {reflectors: Color[], lenses: Color[], clears: number, likes: number}
const PublicInfo: FC<PublicInfoProps> = (props) => {
  return (
    <Box display='flex' flex={1} height='200px' margin='0 20px' flexDirection='column' justifyContent='space-between' alignItems='flex-start' paddingTop='10px' paddingBottom='20px'>
      <ClearsAndLikes {...props}/>
      <MirrorDisplay {...props}/>
    </Box>
  )
}

export default PublicInfo;
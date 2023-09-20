import {FC} from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useColorMode from 'src/hooks/useColorMode';
import { emptyStageUri, EmptyStageURIs } from '@features/stage';

interface ThumbnailProps {thumbnail: string, timestamp: string, personal_best: number | null, gridWidth: number}
const Thumbnail: FC<ThumbnailProps> = ({thumbnail, timestamp, personal_best, gridWidth}) => {
  const {colorMode} = useColorMode();
  return (
    <Box display='flex' flexDirection='column' justifyContent='flex-end' alignItems='center' height='200px' width='200px' position='relative' border='2px solid' borderColor={`${Number.isInteger(personal_best) ? 'gold' : 'white'}`}>
        <img src={'data:image/png;base64,' + emptyStageUri[colorMode][gridWidth as keyof EmptyStageURIs]} height='100%' width='100%' style={{position: 'absolute'}}/>
        <img src={'data:image/png;base64,' + thumbnail} height='100%' width='100%' style={{position: 'absolute'}}/>
        <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' height='27px' width='100%' sx={{backgroundColor: '#141b2d', opacity: 0.7}}>
            <Typography sx={{fontSize: '18px', color: '#F8F8FF', letterSpacing: '2px'}}>{moment(timestamp).format('L')}</Typography>
        </Box>
    </Box>
  )
}

export default Thumbnail;
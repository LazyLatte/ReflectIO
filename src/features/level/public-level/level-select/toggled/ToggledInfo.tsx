import {FC} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import UuidEncoder from 'uuid-encoder';
import {Link} from "react-router-dom";
import {UserLevelInfo} from '../../..';
import useColorMode from 'src/hooks/useColorMode';

const styles = {
    btn: {
      height: '80px',
      width: '200px',
      border: '2px solid',
      fontSize: '2rem',
      '& .MuiButton-endIcon svg': {
        fontSize: '40px'
      }
    }
  }


const encoder = new UuidEncoder('base64url');
interface ToggledInfoProps {userLevelInfo: UserLevelInfo, height: number}
const ToggledInfo: FC<ToggledInfoProps> = ({userLevelInfo, height}) => {
  const {colorMode} = useColorMode();
  const {id, record} = userLevelInfo;
  const level_id = encoder.encode(id);
  const textColor = colorMode === 'dark' ? '#22eeaa' : '#E0FFFF';
  return (
    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'  height={`${height}px`} padding='0 40px' >
        <Box width='65%' height='60%' display='flex' flexDirection='column' justifyContent='space-around' alignItems='flex-start' paddingLeft='5px' border='solid #647cba 3px' color={textColor} sx={{backgroundColor: '#1d2742'}}>
            <Typography variant='h3'>ID : {level_id}</Typography>
            <Typography variant='h3'>World Record : {record}</Typography>
        </Box>
        <Button 
            variant="contained"
            endIcon={<PlayArrowIcon/>} 
            component={Link} 
            to={`/play/level/${level_id}`} 
            state={{userLevelInfo}}
            sx={{
                ...styles.btn,
                color: colorMode === 'dark' ? 'enter.main' : 'white',
                bgcolor: colorMode === 'dark' ? 'primary.main' : 'enter.main',
                ':hover': {
                    bgcolor: colorMode === 'dark' ? '#253353' : 'enter.light',
                }
            }} 
        >
            Play
        </Button>
    </Box>
  )
}

export default ToggledInfo;
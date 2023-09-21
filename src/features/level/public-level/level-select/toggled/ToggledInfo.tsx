import {FC, MouseEvent, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UuidEncoder from 'uuid-encoder';
import {Link} from "react-router-dom";
import {UserLevelInfo} from '../../..';
import useColorMode from 'src/hooks/useColorMode';
import copy from 'copy-to-clipboard';
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

  const [isCopied, setIsCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsCopied(false);
  };
  const handleOnClick = () => {
    copy(level_id);
    setIsCopied(true);
  };
  return (
    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'  height={`${height}px`} padding='0 40px' >
        <Box width='65%' height='60%' display='flex' flexDirection='column' justifyContent='space-evenly' alignItems='flex-start' paddingLeft='10px' border='solid #647cba 3px' color={textColor} sx={{backgroundColor: '#1d2742'}}>
          <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center'>
            <Typography variant='h3'>ID : {level_id}</Typography>
            <Button 
              variant='contained' 
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              onClick={handleOnClick}
              sx={{
                minWidth: '30px', 
                width: '30px', 
                height: '30px', 
                marginLeft: '15px',
                backgroundColor: 'royalblue',
                ':hover': {
                  bgcolor: '#7b97ea'
                }
              }}
            >
              <ContentCopyIcon sx={{fontSize: 24}}/>
            </Button>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography variant='h5' sx={{padding: '5px'}}>{isCopied ? 'Copied!' : 'Click To Copy'}</Typography>
            </Popover>
          </Box>
            
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
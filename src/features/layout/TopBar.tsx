import {FC, useState, useEffect, useRef} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ExtensionIcon from '@mui/icons-material/Extension';
// import Lottie from 'react-lottie';
// import clearStarLottie from '../img/clearStar-lottie.json';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth, useRefreshToken, AccountModal, AccountModalHandle } from '@features/authentication';
import { BuiltInLevelInfo, UserLevelInfo } from '@features/level';

const styles = {
  pfpBtn: {
    height: '50px',
    width: '50px',
    minWidth: '50px',
    minHeight: '50px',
    borderRadius: 2,
    padding: 0,
    backgroundColor: '#bfbff2',
    boxShadow: '0 0 0.2rem #bfbff2',
    '&:hover': {
      backgroundColor: '#d4d4f7'
    }
  },
  locationTxt: {
    color: '#93aed2', 
    font: '40px Comic Sans MS',
    whiteSpace: 'pre-wrap'
  }
}
const path_name_pair = {
  'more': 'MORE',
  'play': 'PLAY',
  'explore': 'EXPLORE',
  'custom': 'CUSTOM',
  'about': 'ABOUT',
  'instructions': 'INSTRUTIONS',
  'mylevels': 'MY LEVELS'
}
const getDisplayText = (paths: string[], userLevelInfo: UserLevelInfo) => {
  if(paths[1]==='') return 'HOME';
  if(paths.length === 2) return path_name_pair[paths[1] as keyof typeof path_name_pair];
  if(paths.length === 3) return '';
  if(paths.length === 4 && paths[1] === 'play'){
    if(paths[2] === 'easy' || paths[2] === 'normal' || paths[2] === 'hard' && Number(paths[3]) <= BuiltInLevelInfo[paths[2]].length){
      return paths[2].toUpperCase() + '-' + paths[3];
    }
    if(paths[2] === 'level'){
      const worldRecord = userLevelInfo?.record;
      const personal_best = userLevelInfo?.personal_best;
      return [`World Record : ${worldRecord >= 0 ? worldRecord : '--'}`,  `Personal Best : ${Number.isInteger(personal_best) && personal_best! >= 0 ? personal_best : '--'}`].join('   ');
    }
  }
  return '';
}
const TopBar = () => {
  const {auth, setAuth} = useAuth()!;
  const navigate = useNavigate();
  const location = useLocation();
  const paths = location.pathname.split('/');
  const displayText = getDisplayText(paths, location?.state?.userLevelInfo);

  const accountModalRef = useRef<AccountModalHandle>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
 
  const handleClose = () => setAnchorEl(null)

  
  const handleSignIn = () => {
    accountModalRef.current?.open();
    handleClose();
  }
  const handleSignOut = () => {
    const guest_name = "GUEST-" + Math.floor((Math.random()*10000)).toString();
    setAuth({name: guest_name, accessToken: null});
    handleClose();
  }
  const handleMyLevels = () => {
    handleClose();
    navigate('./mylevels');
  }
  const refresh = useRefreshToken();
  useEffect(()=>{
    const initRequest = async () => {
      try{
        const accessToken = await refresh();
      }catch(err){
        accountModalRef.current?.open();
      }
    }
    initRequest();
   
  }, [])
  return (
    <Box 
      display='flex' 
      flexDirection='row' 
      flexShrink={0}
      height={100} 
      justifyContent='space-between' 
      alignItems='center' 
      borderBottom='solid #696969 2px'
      padding='0 40px'
      sx={{
        background: 'linear-gradient(to bottom,#272931 0,#17191d 100%)'
      }}
    >
      <Typography sx={styles.locationTxt}>
        {displayText}
      </Typography>
      <Button id="pfp-btn" sx={styles.pfpBtn} onClick={handleClick}>
        {auth && 
          <>
            {auth.accessToken ?
              <Avatar  variant="rounded" src='https://www.svgrepo.com/show/380730/avatar-winter-custome-18.svg' sx={{ width: '100%', height: '100%'}}/>
              :
              <Avatar variant="rounded" sx={{ backgroundColor: 'transparent', fontSize: '20px', fontWeight: 'bold'}}>A</Avatar>
            }
          </>
        }
        
      </Button>
      <Menu
        id="pfp-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}

        sx={{
          borderRadius: '5px',
          marginTop: '5px'
        }}
      >
        {auth?.accessToken ?
          <MenuItem onClick={handleClose} disableRipple sx={{letterSpacing: '2px'}}>
            <EditIcon sx={{marginRight: '7px'}}/>
            Edit
          </MenuItem>
          :
          <MenuItem onClick={handleSignIn} disableRipple sx={{letterSpacing: '2px'}}>
            Sign in
          </MenuItem>
        }

        {auth?.accessToken &&
          <MenuItem onClick={handleMyLevels} disableRipple sx={{letterSpacing: '2px'}}>
            <ExtensionIcon sx={{marginRight: '7px'}}/>
            My Levels
          </MenuItem>
        }
      </Menu>
      <AccountModal ref={accountModalRef}/>
    </Box>
  );
}

export default TopBar;
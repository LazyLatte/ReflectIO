import {useState, useEffect, useRef} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ExtensionIcon from '@mui/icons-material/Extension';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

//import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useAuth, useRefreshToken, AccountModal, AccountModalHandle, userSignOut} from '@features/authentication';
import useColorMode from 'src/hooks/useColorMode';
import GingerbreadMan from '@images/avatar/gingerbread-man.svg';
const styles = {
  pfpBtn: {
    height: '50px',
    width: '50px',
    minWidth: '50px',
    minHeight: '50px',
    borderRadius: 2,
    padding: 0,
    backgroundColor: '#bfbff2',
    border: '2px solid',
    '&:hover': {
      backgroundColor: '#d4d4f7'
    }
  },
  locationTxt: {
    font: '40px Comic Sans MS',
    whiteSpace: 'pre-wrap'
  }
}
const path_name_pair = {
  'more': 'MORE',
  'play': 'PLAY',
  'select': 'SELECT',
  'explore': 'EXPLORE',
  'custom': 'CUSTOM',
  'about': 'ABOUT',
  'tutorial': 'TUTORIAL',
  'mylevels': 'MY LEVELS'
}
const getDisplayText = (paths: string[], {record, personal_best}: {record: number, personal_best: number | null}) => {
  if(paths[1]==='') return 'HOME';
  if(paths.length === 2) return path_name_pair[paths[1] as keyof typeof path_name_pair];
  if(paths.length === 3 && paths[1] === 'tutorial') return 'TUTORIAL';
  if(paths.length === 4 && paths[1] === 'play'){
    if(paths[2] === 'easy' || paths[2] === 'normal' || paths[2] === 'hard'){
      return paths[2].toUpperCase() + '-' + paths[3];
    }
    if(paths[2] === 'level'){
      return [`World Record : ${record >= 0 ? record : '--'}`,  `Personal Best : ${Number.isInteger(personal_best) && personal_best! >= 0 ? personal_best : '--'}`].join('   ');
    }
  }
  return '';
}
const TopBar = () => {
  const {colorMode, toggleColorMode} = useColorMode()!;
  const {auth, setAuth} = useAuth()!;
  const navigate = useNavigate();
  const {state, pathname} = useLocation();
  const {record, personal_best} = state?.userLevelInfo || {record: -1, personal_best: null};
  const paths = pathname.split('/');
  const displayText = getDisplayText(paths, {record, personal_best});

  const accountModalRef = useRef<AccountModalHandle>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
 
  const handleClose = () => setAnchorEl(null)

  
  const handleSignIn = () => {
    accountModalRef.current?.open();
    handleClose();
    location.pathname !== '/' && navigate('/');
  }
  const handleSignOut = async () => {
    try{
      userSignOut();
    }catch(err){
      console.error(err);
    }
  
    setAuth({name: "", accessToken: null});
    handleClose();
    location.pathname !== '/' && navigate('/');
  }

  // const handleToAccount = () => {
  //   handleClose();
  //   navigate('./account');
  // }

  const handleToMyLevels = () => {
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
    location.pathname === '/' && initRequest();
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
        background: colorMode === 'dark' ? 'linear-gradient(to bottom,#272931 0,#17191d 100%)' : 'linear-gradient(to bottom,#ffa399 0,#ff8c80 100%)'
      }}
    >
      <Typography sx={{...styles.locationTxt, color: colorMode === 'dark' ? '#93aed2' : "#4785b8"}}>
        {displayText}
      </Typography>
      <Box>
        <IconButton sx={{marginRight: 3}} onClick={toggleColorMode} color="inherit">
          {colorMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <Button id="pfp-btn" sx={{...styles.pfpBtn, borderColor: colorMode === 'dark' ? '#fff' : '#b478ed'}} onClick={handleClick}>
          {auth && 
            <>
              {auth.accessToken ?
                <Avatar  variant="rounded" src={GingerbreadMan} sx={{ width: '100%', height: '100%'}}/>
                :
                <Avatar variant="rounded" sx={{ backgroundColor: 'transparent', fontSize: '20px', fontWeight: 'bold'}}>G</Avatar>
              }
            </>
          }
          
        </Button>
      </Box>
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
          <MenuList>
            <MenuItem onClick={handleToMyLevels} disableRipple sx={{letterSpacing: '2px'}}>
              <ExtensionIcon sx={{marginRight: '7px'}}/>
              My Levels
            </MenuItem>
            <MenuItem onClick={handleSignOut} disableRipple sx={{letterSpacing: '2px'}}>
              <LogoutIcon sx={{marginRight: '7px'}}/>
              Sign out
            </MenuItem>
          </MenuList>

          :
          <MenuList>
            <MenuItem onClick={handleSignIn} disableRipple sx={{letterSpacing: '2px'}}>
              <LoginIcon sx={{marginRight: '7px'}}/>
              Sign in
            </MenuItem>
          </MenuList>
        }

      </Menu>
      <AccountModal ref={accountModalRef}/>
    </Box>
  );
}

export default TopBar;
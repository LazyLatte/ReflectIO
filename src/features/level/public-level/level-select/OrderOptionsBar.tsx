import {FC, Dispatch, SetStateAction, SyntheticEvent} from 'react';
import Box from '@mui/material/Box';
import Tabs  from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useAuth} from '@features/authentication';
import { UserLevelInfo } from '@features/level';
import { listGlobalLevels } from '@api/level';

interface UpDownIconProps {ascend: boolean}
interface OrderOptionsBar {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  ascend: boolean;
  setAscend: Dispatch<SetStateAction<boolean>>;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  width: number;
  setGlobalLevels: Dispatch<React.SetStateAction<UserLevelInfo[]>>
}
const UpDownIcon: FC<UpDownIconProps> = ({ascend}) => (
  <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
    <KeyboardArrowUpIcon sx={{position: 'relative', top: '10px', transform: 'scale(0.8, 0.8)', color: ascend ? 'gold' : ''}}/>
    <KeyboardArrowDownIcon sx={{position: 'relative', bottom: '10px', transform: 'scale(0.8, 0.8)', color: ascend ? '' : 'gold'}}/>
  </Box>
)
export const OrderOptionsBar: FC<OrderOptionsBar> = ({value, setValue, ascend, setAscend, setHasMore, width, setGlobalLevels}) => {
  const {auth} = useAuth()!;
  const handleChange = (e: SyntheticEvent, newValue: number) => setValue(newValue);


  const orderByClears = async (ascend: boolean) => {
    setGlobalLevels([]);
    const name = auth?.accessToken ? auth?.name : '';
    const newOrderedlevels = await listGlobalLevels(name, 0, 'clears', ascend);
    setGlobalLevels(newOrderedlevels);
    setHasMore(true);
    setAscend(ascend);
  }

  const orderByLikes = async () => {
    setGlobalLevels([]);
    const name = auth?.accessToken ? auth?.name : '';
    const newOrderedlevels = await listGlobalLevels(name, 0, 'likes');
    setGlobalLevels(newOrderedlevels);
    setHasMore(true);
  }

  const orderByTime = async () => {
    setGlobalLevels([]);
    const name = auth?.accessToken ? auth?.name : '';
    const newOrderedlevels = await listGlobalLevels(name, 0, 'timestamp');
    setGlobalLevels(newOrderedlevels);
    setHasMore(true);
  }
  return (
    <Box 
      display='flex' 
      flexDirection='row' 
      width = {width}
      justifyContent='space-around' 
      alignItems='center' 
      border='solid white 1px'
      borderRadius='1px'
      margin='20px 0'
    >
      <AppBar position='static' color='primary' enableColorOnDark> 
        <Tabs 
          value={value} 
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab icon={<UpDownIcon ascend={ascend}/>} iconPosition="end"  label="Clears" onClick={()=>orderByClears(value === 0 ? !ascend : ascend)}/>
          <Tab label="Likes" onClick={orderByLikes}/>
          <Tab label="Newest" onClick={orderByTime}/>
        </Tabs>
      </AppBar>
    </Box>
  );
}



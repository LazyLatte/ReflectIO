import {FC, Dispatch, SetStateAction, SyntheticEvent} from 'react';
import Box from '@mui/material/Box';
import Tabs  from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface UpDownIconProps {ascend: boolean}
interface OrderOptionsBar {
  width: number;
  value: number;
  ascend: boolean;
  setValue: Dispatch<SetStateAction<number>>;
  setAscend: Dispatch<SetStateAction<boolean>>;
}
const UpDownIcon: FC<UpDownIconProps> = ({ascend}) => (
  <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
    <KeyboardArrowUpIcon sx={{position: 'relative', top: '10px', transform: 'scale(0.8, 0.8)', color: ascend ? 'gold' : ''}}/>
    <KeyboardArrowDownIcon sx={{position: 'relative', bottom: '10px', transform: 'scale(0.8, 0.8)', color: ascend ? '' : 'gold'}}/>
  </Box>
)
const OrderOptionsBar: FC<OrderOptionsBar> = ({width, value, ascend, setValue, setAscend}) => {

  const handleChange = (e: SyntheticEvent, newValue: number) => setValue(newValue);
  const orderByClears = async (ascend: boolean) => setAscend(ascend);
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
          <Tab label="Likes" />
          <Tab label="Newest" />
        </Tabs>
      </AppBar>
    </Box>
  );
}

export default OrderOptionsBar;


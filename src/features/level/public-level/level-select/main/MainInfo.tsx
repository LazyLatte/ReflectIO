import { FC, Dispatch, SetStateAction} from 'react';
import Box from '@mui/material/Box';
import PublicInfo from './public-info';
import Thumbnail from './thumbnail';
import {UserLevelInfo} from '../../..';


interface MainInfoProps {
    userLevelInfo: UserLevelInfo; 
    setToggle: Dispatch<SetStateAction<boolean>>;
    height: number;
}
const MainInfo: FC<MainInfoProps> = ({userLevelInfo, setToggle, height}) => {
  return (
    <Box 
        display='flex' 
        flexDirection='row' 
        justifyContent='flex-start' 
        alignItems='center' 
        width='100%' 
        height={`${height}px`}  
        padding='0 40px'
        sx={{
            '&:hover': {
                cursor: 'pointer'
            }
        }}
        onClick={()=>setToggle(prev => !prev)}
    >
        <Thumbnail {...userLevelInfo} gridWidth={userLevelInfo.width}/>
        <PublicInfo {...userLevelInfo}/>
    </Box>
  )
}

export default MainInfo;
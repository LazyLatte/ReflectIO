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
  const {width, reflectorNum, lensNum, clears, likes, timestamp, personal_best, thumbnail} = userLevelInfo;
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
        <Thumbnail thumbnail={thumbnail} timestamp={timestamp} personal_best={personal_best} gridWidth={width}/>
        <PublicInfo reflectorNum={reflectorNum} lensNum={lensNum} clears={clears} likes={likes}/>
    </Box>
  )
}

export default MainInfo
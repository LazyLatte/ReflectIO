import {FC} from 'react';
import Box from '@mui/material/Box';
import StarImg from '@images/icons/star.svg';
import HeartImg from '@images/icons/heart.svg';

interface ClearsAndLikesProps {clears: number, likes: number};
const ClearsAndLikes: FC<ClearsAndLikesProps> = ({clears, likes}) => {
  return (
    <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' fontSize='1.5rem'>
        <img 
            src={StarImg}
            style={{
                width: '60px',
                height: '60px',
                marginRight: '10px'
            }}
        />
        <span style={{fontFamily: ['Orbitron', 'sans-serif'].join(","), letterSpacing: '3px', color: '#b299e6'}}>{clears}</span>
        <img 
            src={HeartImg}
            style={{
                width: '60px',
                height: '60px',
                marginLeft: '30px',
                marginRight: '10px'
            }}
        />
        <span style={{fontFamily: ['Orbitron', 'sans-serif'].join(","), letterSpacing: '3px', color: '#b299e6'}}>{likes}</span>
    </Box>
  )
}

export default ClearsAndLikes;
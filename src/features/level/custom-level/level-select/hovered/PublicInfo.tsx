import {FC} from 'react';
import Box from '@mui/material/Box';

interface PublicInfoProps {
    img: string;
    isPublic: boolean;
    count: number;
}

const PublicInfo: FC<PublicInfoProps> = ({img, isPublic, count}) => {
  return (
    <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' alignSelf='flex-start' fontSize='1.5rem'>
        <img 
            src={img}
            style={{
                width: '60px',
                height: '60px',
                marginLeft: '20px',
                marginRight: '20px'
            }}
        />
        <span 
            style={{
                fontFamily: ['Orbitron', 'sans-serif'].join(","), 
                letterSpacing: '3px', 
                color: '#b299e6'
            }}
        >
            {isPublic ? count : '--'}
        </span>
    </Box>
  )
}

export default PublicInfo;
import {useState, FC, memo} from 'react';
import moment from 'moment';
import UuidEncoder from 'uuid-encoder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { motion } from "framer-motion"
import {Link} from "react-router-dom";
import {UserLevelInfo, MAX_MIRROR_NUM} from '@features/level';

import StarImg from '@images/icons/star.svg';
import HeartImg from '@images/icons/heart.svg';
import ReflectorWhiteImg from '@images/mirrors/reflector-default-dark.png';
import LensWhiteImg from '@images/mirrors/lens-default-dark.png';

const styles = {
  btn: {
    height: '80px',
    width: '200px',
    border: '2px solid',
    color: 'gold',
    fontSize: '2rem',
    '& .MuiButton-endIcon svg': {
      fontSize: '40px'
    }
  }
}

const encoder = new UuidEncoder('base64url');
interface LevelInfoCardProps {userLevelInfo: UserLevelInfo}
export const LevelInfoCard: FC<LevelInfoCardProps> = ({userLevelInfo}) => {
  const {id, height, width, lasers, targets, reflectorNum, lensNum, clears, likes, record, creator, timestamp, personal_best, isFavorite, thumbnail} = userLevelInfo;
  const mirrors = Array(reflectorNum).fill('reflector').concat(Array(lensNum).fill('lens')).concat(Array(MAX_MIRROR_NUM-reflectorNum-lensNum).fill(null));
  const [toggle, setToggle] = useState(false);
  const mainInfoHeight = 300;
  const toggledInfoHeight = 200;

  const level_id = encoder.encode(id);
  return (
        <motion.div 
          initial={false}
          animate={{height: toggle ? `${mainInfoHeight + toggledInfoHeight}px` : `${mainInfoHeight}px`}}
          transition={{duration: 0.5}}
          style={{
            width: '800px',
            backgroundColor: '#182036',
            border: `solid ${Number.isInteger(personal_best) ? 'gold' : '#FAF0E6'}`,
            borderRadius: '5px',
            margin: '0 auto 20px',
            overflow: 'hidden'
          }}
        >
          <Box 
            className='main_info'
            display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' width='100%' height={`${mainInfoHeight}px`}  padding='0 40px'
            sx={{
              '&:hover': {
                  cursor: 'pointer'
              }
            }}
            onClick={()=>setToggle(prev => !prev)}
          >

            <Box display='flex' flexDirection='column' justifyContent='flex-end' alignItems='center' height='200px' width='200px' position='relative' border='2px solid white'>
              <img src={'data:image/png;base64,' + thumbnail} height='100%' width='100%' style={{position: 'absolute'}}/>
              <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' height='27px' width='100%' sx={{backgroundColor: '#141b2d', opacity: 0.7}}>
                <Typography sx={{fontSize: '18px', color: '#F8F8FF', letterSpacing: '2px'}}>{moment(timestamp).format('L')}</Typography>
              </Box>
            </Box>
            <Box display='flex' flex={1} height='200px' margin='0 20px' flexDirection='column' justifyContent='space-between' alignItems='flex-start' paddingTop='10px' paddingBottom='20px'>
              <Box className='clears_and_likes' display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' fontSize='1.5rem'>
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

              <Box className='mirror_info' display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' padding='5px 0' border='solid #647cba 3px' borderRadius='5px' sx={{backgroundColor: '#1d2742'}}> 
                {mirrors.map((mirrorType, i) => (
                  <Box width='50px' height='60px' key={i}>
                    {mirrorType ? 
                      <img src={mirrorType === 'reflector' ? ReflectorWhiteImg : LensWhiteImg} height='100%' width='100%'/>
                    :
                      <Box width='100%' height='100%'/>
                    }
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box sx={{width: '90%', height: '1px', margin: '0 auto',backgroundColor: '#FAF0E6'}}/>
          <Box className='toggled' display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'  height={`${toggledInfoHeight}px`} padding='0 40px' >
            <Box className='toggled_info' width='65%'  height='60%' display='flex' flexDirection='column' justifyContent='space-around' alignItems='flex-start' paddingLeft='5px' border='solid #647cba 3px' sx={{backgroundColor: '#1d2742'}}>
              <Typography variant='h3' sx={{color: '#33ffbb'}}>Level-ID : {level_id}</Typography>
              <Typography variant='h3' sx={{color: '#33ffbb'}}>World Record : {record}</Typography>
            </Box>
            <Button variant="contained" endIcon={<PlayArrowIcon/>} sx={styles.btn} component={Link} to={`/play/level/${level_id}`} state={{userLevelInfo}}>Play</Button>
          </Box>
        </motion.div>

  );
}


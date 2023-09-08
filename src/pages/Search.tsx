import {useState, ChangeEvent} from 'react';
import MotionPage from './MotionPage';
import axios from '@api/axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { UserLevelInfo } from '@features/level';
import {PublicLevelInfoCard} from '@features/level/public-level';
import { motion, AnimatePresence  } from "framer-motion";
import UuidEncoder from 'uuid-encoder';




const encoder = new UuidEncoder('base64url');
//2ECbKQ9Ff4Fuer5n7KvhJo
//1z1bpxAKT5Nefv1T_RAYRB
const ID_REGEX = /[a-zA-Z0-9_-]{22}/;
const Search = () => {
  const [levelID, setLevelID] = useState<string>('');
  const [level, setLevel] = useState<UserLevelInfo | null>(null);
  const [errMsg, setErrMsg] = useState<string>('');
  const search = async () => {
    const isValid = ID_REGEX.test(levelID);
    if(isValid){
      const {data} = await axios.get<UserLevelInfo | null>(`/levels/${encoder.decode(levelID)}`);
      if(data){
        setErrMsg('');
        setLevel(data);
      }else{
        setErrMsg('Level not found');
      }
    }else{
      setErrMsg('Invalid ID');
    }
  }

  return (
    <MotionPage transitionType='slide' style={{alignItems: 'center'}}>
      <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' margin='0 0 100px'>
        <TextField
          id='search-level'
          autoComplete='off'
          placeholder='Level ID :'
          variant="outlined"
          color="secondary"
          value={levelID}
          error={Boolean(errMsg)}
          label={errMsg}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLevelID(e.target.value);
          }}
          focused 
          size='medium'
          sx={{width: 600}}
        />
        <Button variant="contained" color='secondary' sx={{height: 72, marginLeft: '10px'}} onClick={search}>
          <Typography variant="search">
            Search
          </Typography>
        </Button>
      </Box>
      <AnimatePresence mode='wait'>
        {level &&
          <motion.div
            key={`${level.id}`}
            initial={{x: '50vw', opacity: 0}}
            animate={{ x: 0, opacity: 1}}
            exit={{x: '-50vw', opacity: 0}}
            transition= { {duration: 0.6}}
          >
            <PublicLevelInfoCard userLevelInfo={level}/>
          </motion.div>
        }
      </AnimatePresence>
    </MotionPage>
  );
}

export default Search;


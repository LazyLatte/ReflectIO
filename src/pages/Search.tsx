import {useState, useEffect, ChangeEvent} from 'react';
import { motion, AnimatePresence  } from "framer-motion";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LevelInfoCard from '../components/LevelInfoCard';
import {getLevelByID} from '../api/level';
import { UserLevelInfo } from '../Interfaces';
import UuidEncoder from 'uuid-encoder';
const encoder = new UuidEncoder('base64url');
//2ECbKQ9Ff4Fuer5n7KvhJo
//1z1bpxAKT5Nefv1T_RAYRB
const Search = () => {
  const [levelID, setLevelID] = useState<string>('');
  const [level, setLevel] = useState<UserLevelInfo | null>(null);
  const [errMsg, setErrMsg] = useState<string>('');
  const search = async () => {
    if(levelID.length === 22){
      const result = await getLevelByID(encoder.decode(levelID));
      if(result){
        setErrMsg('');
        setLevel(result);
      }else{
        setErrMsg('Level not found');
      }
    }else{
      setErrMsg('ID should be 22 characters');
    }
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }}
      transition= { {duration: 0.8 }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '64px'
      }}
    >
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
              <LevelInfoCard userLevelInfo={level}/>
            </motion.div>
        }
      </AnimatePresence>
    </motion.div>
  );
}

export default Search;


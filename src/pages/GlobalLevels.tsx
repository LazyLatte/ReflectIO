import {useState, useEffect, FC} from 'react'
import Box from '@mui/material/Box';
import InfiniteScroll from 'react-infinite-scroll-component';

import { SearchButton, ScrollTopButton } from '@features/ui/button';
import {listGlobalLevels} from '../api/level';

import { motion } from "framer-motion"
import {OrderOptionsBar, LevelInfoCard, UserLevelInfo} from '@features/level';
import { useAuth } from '@features/authentication';
const orderByOptions = ['clears', 'likes', 'timestamp'];
interface GlobalLevelsProps {};
const GlobalLevels: FC<GlobalLevelsProps> = ({}) => {
  const {auth} = useAuth()!;
  const [value, setValue] = useState<number>(0);
  const [ascend, setAscend] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [globalLevels, setGlobalLevels] = useState<UserLevelInfo[]>([]); 
  const fetchGlobalLevels = async () => {
    try{
      const name = auth?.accessToken ? auth?.name : '';
      const newGlobalLevels = await listGlobalLevels(name, globalLevels.length, orderByOptions[value], value === 0 ? ascend : false);
      console.log(newGlobalLevels);
      newGlobalLevels.length > 0 ? setGlobalLevels(prev => [...prev, ...newGlobalLevels]) : setHasMore(false);
    }catch(err){
      console.error(err);
    }
  };
  useEffect(() => {
    fetchGlobalLevels();
  }, [])
  return (
    <div
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='flex-start' alignSelf='flex-end' flex={1} height='80%' minWidth='170px'>
        <SearchButton/>
      </Box>
      <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center' height='100%'>
        <OrderOptionsBar value={value} setValue={setValue} ascend={ascend} setAscend={setAscend} setHasMore={setHasMore} width={800} setGlobalLevels={setGlobalLevels}/>
        <InfiniteScroll
          dataLength={globalLevels.length} 
          next={fetchGlobalLevels}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={window.innerHeight-240}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! That's all</b>
            </p>
          }
        >
          {globalLevels.map((level, idx) => (
            <motion.div
              initial={{x: '100vw'}}
              animate={{ x: 0}}
              transition= { {duration: 0.8, delay: 0.25 * (idx%5) }}
              key={idx}
            >
              <LevelInfoCard userLevelInfo={level}/>
            </motion.div>
          ))}
        </InfiniteScroll>
      </Box>
      <Box flex={1} alignSelf='flex-end'>
        <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' marginRight='auto' width='50%' minWidth='200px'>
          <ScrollTopButton/>
        </Box>
      </Box>
    </div>
  )
}

export default GlobalLevels;

import {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchButton, ScrollTopButton } from '@features/ui/button';
import { motion } from "framer-motion";
import {OrderOptionsBar, PublicLevelInfoCard, useGetGlobalLevels} from '@features/level/public-level';
const orderOptions = ['clears', 'likes', 'timestamp'];
const GlobalLevels = () => {
  const [value, setValue] = useState<number>(0);
  const [ascend, setAscend] = useState<boolean>(false);

  const {data, fetchNextPage, hasNextPage, refetch, remove} = useGetGlobalLevels(orderOptions[value], value === 0 ? ascend : false);
  const globalLevels = data?.pages.flat() || [];

  useEffect(() => {
    remove();
    refetch();
  }, [value, ascend])
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
        <OrderOptionsBar value={value} setValue={setValue} ascend={ascend} setAscend={setAscend} width={800} />
        <InfiniteScroll
          dataLength={globalLevels.length} 
          next={fetchNextPage}
          hasMore={Boolean(hasNextPage)}
          loader={<h4>Loading...</h4>}
          height={window.innerHeight-240}
        >
          {globalLevels.map((level, idx) => (
            <motion.div
              initial={{x: '100vw'}}
              animate={{ x: 0}}
              transition= { {duration: 0.8, delay: 0.25 * (idx%5) }}
              key={idx}
            >
              <PublicLevelInfoCard userLevelInfo={level}/>
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

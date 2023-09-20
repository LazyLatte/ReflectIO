import {FC} from 'react';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import useColorMode from 'src/hooks/useColorMode';
import { emptyStageUri, EmptyStageURIs } from '@features/stage';

interface ThumbnailProps {thumbnail: string, gridWidth: number};
const Thumbnail: FC<ThumbnailProps> = ({thumbnail, gridWidth}) => {
  const {colorMode} = useColorMode(); 
  return (
    <Box height='100%' width='100%' position='relative'>
        <motion.img 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.8}}
            style={{position: 'absolute'}}
            src={'data:image/png;base64,' + emptyStageUri[colorMode][gridWidth as keyof EmptyStageURIs]} 
            height='100%' 
            width='100%'
        />
        <motion.img 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.8}}
            style={{position: 'absolute'}}
            src={'data:image/png;base64,' + thumbnail} 
            height='100%' 
            width='100%'
        />
    </Box>
  )
}

export default Thumbnail;
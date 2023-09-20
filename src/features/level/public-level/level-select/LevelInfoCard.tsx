import {useState, FC} from 'react';
import { motion } from "framer-motion"
import {UserLevelInfo} from '@features/level';
import useColorMode from 'src/hooks/useColorMode';

import MainInfo from './main';
import ToggledInfo from './toggled';
import Separator from './separator';
interface LevelInfoCardProps {userLevelInfo: UserLevelInfo}
const mainInfoHeight = 300;
const toggledInfoHeight = 200;
const LevelInfoCard: FC<LevelInfoCardProps> = ({userLevelInfo}) => {
  const {colorMode} = useColorMode()!;
  const [toggle, setToggle] = useState(false);
  const backgroundColor = colorMode === 'dark' ? '#182036' : '#372f6a';
  const borderColor = colorMode === 'dark' ? '#FAF0E6' : '#3b0066';
  return (
        <motion.div 
          initial={false}
          animate={{height: toggle ? `${mainInfoHeight + toggledInfoHeight}px` : `${mainInfoHeight}px`}}
          transition={{duration: 0.5}}
          style={{
            borderColor,
            backgroundColor,
            width: '800px',
            borderStyle: 'solid',
            borderWidth: '3px',
            borderRadius: '5px',
            margin: '0 auto 20px',
            overflow: 'hidden'
          }}
        >
          
          <MainInfo userLevelInfo={userLevelInfo} setToggle={setToggle} height={mainInfoHeight}/>
          <Separator/>
          <ToggledInfo userLevelInfo={userLevelInfo} height={toggledInfoHeight}/>
        </motion.div>

  );
}

export default LevelInfoCard;


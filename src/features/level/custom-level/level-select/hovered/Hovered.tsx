import {FC} from 'react';
import { motion } from 'framer-motion';
import { UserLevelInfo } from '../../..';
import PublicInfo from './PublicInfo';
import EditAndDeleteButtons from './EditAndDeleteButtons';
import StarImg from '@images/icons/star.svg';
import HeartImg from '@images/icons/heart.svg';

interface HoveredProps {
    userLevelInfo: UserLevelInfo;
    isPublic: boolean;
    clears: number;
    likes: number;
    onDelete: () => void;
}
const Hovered: FC<HoveredProps> = ({userLevelInfo, isPublic, clears, likes, onDelete}) => {
  return (
    <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.8}}
        style={{
            position: 'absolute',
            height: '95%', 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}
    >
        <PublicInfo img={StarImg} count={clears} isPublic={isPublic}/>
        <PublicInfo img={HeartImg} count={likes} isPublic={isPublic}/>
        <EditAndDeleteButtons userLevelInfo={userLevelInfo} onDelete={onDelete}/>
    </motion.div>
  )
}

export default Hovered;
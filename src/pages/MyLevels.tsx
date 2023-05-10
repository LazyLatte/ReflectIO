import {useState, useEffect, FC} from 'react'
import {Link, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from "framer-motion";
import {UserLevelInfo} from '@features/level';
import useAuth from '../features/authentication/hooks/useAuth';
import useAxiosPrivate from '../features/authentication/hooks/useAxiosPrivate';
import useModalRef from '../features/modal/useModalRef';

const myLevelsShape = {height: 2, width: 4};
const maxLevelNumber = myLevelsShape.height * myLevelsShape.width;


const styles = {
  btn: {
    height: '100%',
    width: '100%',
    padding: 0,
    '&:hover': {
      backgroundColor: '#141b2d'
    }
  }
}
interface MyLevelsProps {};
const MyLevels: FC<MyLevelsProps> = ({}) => {
  const navigate = useNavigate();
  const {auth} = useAuth()!;
  const axiosPrivate = useAxiosPrivate();
  const {shouldSignInModalRef} = useModalRef();
  const [myLevels, setMyLevels] = useState<UserLevelInfo[]>([]);
  const myLevelsArray = Array(myLevelsShape.height).fill(Array(myLevelsShape.width).fill(0));
  
  const createLevel = async () => {
    if(auth?.accessToken){
      try{
        const response = await axiosPrivate.post('/levels');
        
        console.log('New level created!');
        navigate('/custom', {state: {userLevelInfo: response.data}});
      }catch(err){
        shouldSignInModalRef.current.open(false);
      }
    }else{
      navigate('/custom')
    }

  };

  const getUserLevels = async () => {
    if(auth?.accessToken){
      try{
        const response = await axiosPrivate.get(`/levels/custom`);
        setMyLevels([...response.data]);
      }catch(err){
        shouldSignInModalRef.current.open(false);
        //should resend req
      }
    }

  };
  useEffect(()=>{
    getUserLevels();
  }, [auth?.refresh])
  return (
    <motion.div 
      initial={{x: '100vw', opacity: 0}}
      animate={{ x: 0, opacity: 1}}
      exit={{ x: '100vw', opacity: 0 }}
      transition= { {duration: 0.8 }}
      style={{
        position: 'absolute', 
        width: '100%', 
        flex: 1, 
        paddingTop: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box border='2px solid white' boxShadow='0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 1rem #fff' borderRadius={3}>
        {myLevelsArray.map((row, i)=>(
          <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' key={i}>
            {row.map((_, j)=>(
              <Box height={250} width={250} flexShrink={0} margin={5} border='2px solid pink' boxShadow='0 0 .2rem pink, 0 0 .2rem pink' key={j}>
                  {i*myLevelsShape.width+j < myLevels.length &&
                    <Button component={Link} to='/custom' state={{userLevelInfo: myLevels[i*myLevelsShape.width+j]}} sx={styles.btn}>
                        A
                    </Button>
                  }
                  {i*myLevelsShape.width+j === myLevels.length &&
                    <Button onClick={createLevel} sx={styles.btn}>
                      <img src={'https://stackblitz.com/files/react-ts-mirrorgame/github/LazyLatte/MirrorGame/main/src/img/icons/plus.svg'} style={{height: '100%', width: '100%'}}/>
                    </Button>
                  }
                
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </motion.div>
      
  )
}

export default MyLevels;

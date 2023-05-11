import {useRef, FC, ReactNode} from 'react'
import { isAxiosError, isCancel } from 'axios';
import { motion } from "framer-motion";
import { ClipLoader } from 'react-spinners';
import {Link, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import { ReLoginModal, ReLoginModalHandle } from '@features/authentication';
import { useGetUserLevels } from '@features/level/custom-level/api/use-get-levels';
import { useCreateLevel } from '@features/level/custom-level/api/use-post-level';

const myLevelsShape = {height: 2, width: 4};
interface DisplayCellProps {
  idx: number;
  levelNum: number;
  children: (idx: number, levelNum: number) => ReactNode;
}
interface MyLevelsProps {};
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
const DisplayCell: FC<DisplayCellProps> = ({idx, levelNum,  children}) => {
  return (
    <Box height={250} width={250} flexShrink={0} margin={5} border='2px solid pink' boxShadow='0 0 .2rem pink, 0 0 .2rem pink' >
      {children(idx, levelNum)}
    </Box>
  )
}

const MyLevels: FC<MyLevelsProps> = () => {
  const navigate = useNavigate();
  const {data: myLevels, isLoading, isError} = useGetUserLevels();
  const createLevelMutation = useCreateLevel();
  const reLoginModalRef = useRef<ReLoginModalHandle>(null)
  const myLevelsArray: null[][] = Array(myLevelsShape.height).fill(Array(myLevelsShape.width).fill(null));
  const createLevel = () => {
    createLevelMutation.mutate({height: 10, width: 10}, {
      onSuccess: (data) => {
        reLoginModalRef.current?.open();
        //navigate('/custom', {state: {userLevelInfo: data}});
      },
      onError: (error) => {
        if(isCancel(error)){
          navigate('/custom')
        }else if(isAxiosError(error)){
          switch(error.response?.status){
            case 401:
              reLoginModalRef.current?.open();
              break;
            default:
              break;
          }
        }
      }
    })
  };
  
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
                <DisplayCell idx={i*myLevelsShape.width+j} levelNum={myLevels?.length || 0} key={i*myLevelsShape.width+j}>
                  {(idx, levelNum) => {
                    if(isLoading){
                      return (
                        <ClipLoader
                          color={'green'}
                          loading={true}
                          size={250}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      )   
                    }else if(idx < levelNum){
                      return (
                        <Button component={Link} to='/custom' state={{userLevelInfo: myLevels![idx]}} sx={styles.btn}>
                          A
                        </Button>
                      )
                    }else if(idx === levelNum){
                      return (
                        <Button onClick={createLevel} sx={styles.btn}>
                          <img src={'https://stackblitz.com/files/react-ts-mirrorgame/github/LazyLatte/MirrorGame/main/src/img/icons/plus.svg'} style={{height: '100%', width: '100%'}}/>
                        </Button>
                      )
                    }
                    return null;
                  }}   
              </DisplayCell>
            ))}
          </Box>
        ))}
      </Box>
      <ReLoginModal onLogin={createLevel} ref={reLoginModalRef}/>
    </motion.div>
      
  )
}

export default MyLevels;

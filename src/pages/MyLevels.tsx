import {useRef, FC, ReactNode} from 'react';
import MotionPage from './MotionPage';
import { ClipLoader } from 'react-spinners';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import { CustomLevelInfoCard, StageSizeModal, StageSizeModalHandle } from '@features/level';
import { useGetUserLevels } from '@features/level/custom-level/api/use-get-levels';



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
const DisplayCell: FC<DisplayCellProps> = ({idx, levelNum, children}) => {
  return (
    <Box height={250} width={250} flexShrink={0} margin={5}>
      {children(idx, levelNum)}
    </Box>
  )
}

const MyLevels: FC<MyLevelsProps> = () => {
  
  const {data: myLevels, isLoading, isError} = useGetUserLevels();
  const myLevelsArray: null[][] = Array(myLevelsShape.height).fill(Array(myLevelsShape.width).fill(null));
  const stageSizeModalRef = useRef<StageSizeModalHandle>(null);
  const handleOnClick = () => {
    stageSizeModalRef.current?.open();
  }
  return (
    <MotionPage transitionType='slide' style={{paddingTop: '150px', justifyContent: 'center',alignItems: 'center'}}>
      <Box border='2px solid white' boxShadow='0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 1rem #fff' borderRadius={3}>
        {myLevelsArray.map((row, i)=>(
          <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' key={i}>
            {row.map((_, j)=>(
                <DisplayCell idx={i*myLevelsShape.width+j} levelNum={myLevels?.length || 0} key={i*myLevelsShape.width+j}>
                  {(idx, levelNum) => {
                    let borderColor = 'pink';
                    if(isLoading){
                      return (
                        <Box height='100%' width='100%' border={`2px solid ${borderColor}`} boxShadow={`0 0 .2rem ${borderColor}`}>
                          <ClipLoader
                            color={'green'}
                            loading={true}
                            size={250}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </Box>
                      )   
                    }else if(idx < levelNum){
                      borderColor = myLevels![idx].public ? 'gold' : 'pink';
                      return (
                        <Box height='100%' width='100%' border={`2px solid ${borderColor}`} boxShadow={`0 0 .2rem ${borderColor}`}>
                          <CustomLevelInfoCard userLevelInfo={myLevels![idx]}/>
                        </Box>
                      )
                    }else if(idx === levelNum){
                      return (
                        <Box height='100%' width='100%' border={`2px solid ${borderColor}`} boxShadow={`0 0 .2rem ${borderColor}`}>
                          <Button onClick={handleOnClick} sx={styles.btn}>
                            <img src={'https://stackblitz.com/files/react-ts-mirrorgame/github/LazyLatte/MirrorGame/main/src/img/icons/plus.svg'} style={{height: '100%', width: '100%'}}/>
                          </Button>
                        </Box>
                      )
                    }
                    return <Box height='100%' width='100%' border={`2px solid ${borderColor}`} boxShadow={`0 0 .2rem ${borderColor}`}/>
                  }}   
              </DisplayCell>
            ))}
          </Box>
        ))}
      </Box>
      <StageSizeModal ref={stageSizeModalRef}/>
    </MotionPage>
      
  )
}

export default MyLevels;

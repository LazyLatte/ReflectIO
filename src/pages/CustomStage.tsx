import {FC} from 'react'
import Stage from '../components/stage/Stage';
import StageButtonGroup from '../components/stage/StageButtonGroup';
import {useLocation} from "react-router-dom";
import { AxiosInstance } from 'axios';
import {useLevel} from '../hooks/useLevel';
import useAuth from '../hooks/useAuth';
import useImages from '../hooks/useImages';
import useModalRef from '../hooks/useModalRef';
import useStageConfig from '../hooks/useStageConfig';
import { Level, LevelInfo, UserLevelInfo } from '../Interfaces';
interface LocationState {userLevelInfo: UserLevelInfo};
interface CustomStageProps {axiosPrivate: AxiosInstance}

const emptyStage: UserLevelInfo = {
  id: '',
  height: 10 ,
  width: 10 ,
  lasers: [] ,
  targets: [] ,
  reflectorNum: 0,
  lensNum: 0,
  clears: 0,
  likes: 0,
  record: 8,
  public: false,
  creator: '',
  timestamp: ''
}

const CustomStage: FC<CustomStageProps> = ({axiosPrivate}) => {
  const {auth} = useAuth()!;
  const { state } = useLocation();
  const {userLevelInfo} = state as LocationState || emptyStage;
  const {id} = userLevelInfo;
  const {shouldRearrange} = useStageConfig();
 
  const level: Level = useLevel(userLevelInfo, shouldRearrange, true);
  const [levelState, mirrorActions, setTargetClear, setLevelClear, customizationTools] = level;

  const {saveImg, uploadImg} = useImages()?.StageButtonImages || {};
  const {warningModalRef, uploadConfirmModalRef, shouldSignInModalRef} = useModalRef();

  const levelInfo: LevelInfo = {
    height: levelState.height,
    width: levelState.width,
    lasers: levelState.lasers,
    targets: levelState.targets.map((e, i)=>({pos: e.pos, color: e.color})),
    reflectorNum: levelState.reflectors.length,
    lensNum: levelState.lens.length
  }
  const checkLevelClear = () => levelState.targets.reduce((accumulator, target) => accumulator && Boolean(target.clear), true);
  const update = async () => {
    try{
      console.log(`Updating level ${id}`)
      const {data} = await axiosPrivate.put<UserLevelInfo>(`/levels/${id}`, {levelInfo});
      console.log(data);
    }catch(err){
      if(auth?.accessToken){
        shouldSignInModalRef.current.open(false);
      }else{
        shouldSignInModalRef.current.open(true);
      }
    }
  }
  const upload = async () => {
    const mirrorStates = {
      reflectors: levelState.reflectors.map((mirror, i)=>({pos: mirror.pos, deg: mirror.deg})),
      lenses: levelState.lens.map((mirror, i)=>({pos: mirror.pos, deg: mirror.deg}))
    };
    try{
      console.log(`Uploading level ${id}`)
      const {data} = await axiosPrivate.put<UserLevelInfo>(`/levels/upload/${id}`, {levelInfo, mirrorStates});
      console.log(data);
    }catch(err){
      if(auth?.accessToken){
        shouldSignInModalRef.current.open(false);
      }else{
        shouldSignInModalRef.current.open(true);
      }
    }
  }
  const handleOnUpload = async () => {
    if(levelInfo.lasers.length <= 0 || levelInfo.targets.length <= 0){
      warningModalRef.current.open('The level should contain at least 1 laser and 1 target');
    }else if(!checkLevelClear()){
      warningModalRef.current.open('Level is not clear');
    }else{
      uploadConfirmModalRef.current.open(upload);
    }
  }
  
  return (
    <Stage level={level} clearCallback={()=>{}}>
      <StageButtonGroup 
        gridHeight={levelState.height} 
        gridWidth={levelState.width} 
        btnImg1={saveImg}
        btnImg2={uploadImg} 
        onClick1={update} 
        onClick2={handleOnUpload}
      />
    </Stage>
  )
}

export default CustomStage;
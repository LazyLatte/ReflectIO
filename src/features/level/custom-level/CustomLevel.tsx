import {FC} from 'react';
import useImage from 'use-image';
import {Stage, StageButtonGroup, Mode} from '@features/stage';
import { LevelInfo, UserLevelInfo, useLevel } from '@features/level';
import {useLocation} from "react-router-dom";
import { AxiosInstance } from 'axios';
import useAuth from '../../../hooks/useAuth';
import useModalRef from '../../modal/useModalRef';

interface LocationState {userLevelInfo: UserLevelInfo};
interface CustomLevelProps {axiosPrivate: AxiosInstance}

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

const CustomLevel: FC<CustomLevelProps> = ({axiosPrivate}) => {
  const {auth} = useAuth()!;
  const { state } = useLocation();
  const {userLevelInfo} = state as LocationState || emptyStage;
  const {id} = userLevelInfo;
 
  const level = useLevel(userLevelInfo);
  const [levelState] = level;

  
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
  
  const [saveImg] = useImage('https://www.svgrepo.com/show/509215/save-alt.svg');
  const [uploadImg] = useImage('https://www.svgrepo.com/show/502880/upload-2.svg');
  return (
    <Stage mode={Mode.Custom} level={level} onClear={()=>{}}>
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

export default CustomLevel;
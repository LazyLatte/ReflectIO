import {FC, useRef} from 'react';
import useImage from 'use-image';
import {useLocation} from "react-router-dom";
import {Stage, StageButtonGroup, Mode} from '@features/stage';
import { UserLevelInfo, useLevel, state2info, getMirrorStates } from '@features/level';
import {useAuth, useAxiosPrivate, ReLoginModal, ReLoginModalHandle} from '@features/authentication';
import UploadConfirmModal, {UploadConfirmModalHandle} from './UploadConfirmModal';
import WarningModal, {WarningModalHandle} from './WarningModal';

interface CustomLevelProps {}
interface LocationState {userLevelInfo: UserLevelInfo};
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

const CustomLevel: FC<CustomLevelProps> = () => {
  const {auth} = useAuth()!;
  const axiosPrivate = useAxiosPrivate();
  const { state } = useLocation();
  const {userLevelInfo} = state as LocationState || {userLevelInfo: emptyStage};
  const {id} = userLevelInfo;
 
  const level = useLevel(userLevelInfo);
  const [levelState] = level;
  const levelInfo = state2info(levelState);
  const mirrorStates = getMirrorStates(levelState);

  const reLoginModalRef = useRef<ReLoginModalHandle>(null);
  const uploadConfirmModalRef = useRef<UploadConfirmModalHandle>(null);
  const warningModalRef = useRef<WarningModalHandle>(null);
  
  const update = async () => {
    try{
      const {data} = await axiosPrivate.put<UserLevelInfo>(`/levels/${id}`, {levelInfo});
      console.log(data);
    }catch(err){
      if(auth?.accessToken){
        reLoginModalRef.current?.open(false);
      }else{
        reLoginModalRef.current?.open(true);
      }
    }
  }
  const upload = async () => {
    try{
      const {data} = await axiosPrivate.put<UserLevelInfo>(`/levels/upload/${id}`, {levelInfo, mirrorStates});
      console.log(data);
    }catch(err){
      if(auth?.accessToken){
        reLoginModalRef.current?.open(false);
      }else{
        reLoginModalRef.current?.open(true);
      }
    }
  }
  const handleOnUpload = async () => {
    if(levelInfo.lasers.length <= 0 || levelInfo.targets.length <= 0){
      warningModalRef.current?.open('The level should contain at least 1 laser and 1 target');
    }else if(!levelState.clear){
      warningModalRef.current?.open('Level is not clear');
    }else{
      uploadConfirmModalRef.current?.open(upload);
    }
  }
  
  const [saveImg] = useImage('https://www.svgrepo.com/show/509215/save-alt.svg');
  const [uploadImg] = useImage('https://www.svgrepo.com/show/502880/upload-2.svg');
  return (
    <>
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
      <ReLoginModal ref={reLoginModalRef}/>
      <UploadConfirmModal ref={uploadConfirmModalRef}/>
      <WarningModal ref={warningModalRef}/>
    </>
  )
}

export default CustomLevel;
import {FC, useRef} from 'react';
import useImage from 'use-image';
import { isAxiosError, isCancel } from 'axios';
import {useLocation} from "react-router-dom";
import {Stage, StageButtonGroup, Mode} from '@features/stage';
import { UserLevelInfo, useLevel, state2info, getMirrorStates } from '@features/level';
import { ReLoginModal, ReLoginModalHandle} from '@features/authentication';
import UploadConfirmModal, {UploadConfirmModalHandle} from './UploadConfirmModal';
import WarningModal, {WarningModalHandle} from './WarningModal';
import { useUpdateLevel, useUploadLevel } from '../api/use-put-level';
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
  timestamp: '',
  personal_best: null
}

const CustomLevel: FC<CustomLevelProps> = () => {
  const { state } = useLocation();
  const {userLevelInfo} = state as LocationState || {userLevelInfo: emptyStage};
  const {id} = userLevelInfo;
 
  const level = useLevel(userLevelInfo);
  const [levelState] = level;
  const levelInfo = state2info(levelState);
  const mirrorStates = getMirrorStates(levelState);

  const reLoginModalRefForUpdate = useRef<ReLoginModalHandle>(null);
  const reLoginModalRefForUpload = useRef<ReLoginModalHandle>(null);
  const uploadConfirmModalRef = useRef<UploadConfirmModalHandle>(null);
  const warningModalRef = useRef<WarningModalHandle>(null);
  


  const updateMutation = useUpdateLevel();
  const uploadMutation = useUploadLevel();

  const update = () => {
    updateMutation.mutate({id, levelInfo}, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        if(isCancel(error)){
          alert("Sign in to have your own level!");
        }else if(isAxiosError(error)){
          switch(error.response?.status){
            case 401:
              reLoginModalRefForUpdate.current?.open();
              break;
            default:
              break;
          }
        }
      }
    })
  }

  const upload = () => {
    uploadMutation.mutate({id, levelInfo, mirrorStates}, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        if(isCancel(error)){
          alert("Sign in to have your own level!");
        }else if(isAxiosError(error)){
          switch(error.response?.status){
            case 401:
              reLoginModalRefForUpload.current?.open();
              break;
            default:
              break;
          }
        }
      }
    })
  }
  const uploadConfirm = () => {
    if(levelInfo.lasers.length <= 0 || levelInfo.targets.length <= 0){
      warningModalRef.current?.open('The level should contain at least 1 laser and 1 target');
    }else if(!levelState.clear){
      warningModalRef.current?.open('Level is not clear');
    }else{
      uploadConfirmModalRef.current?.open();
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
          onClick2={uploadConfirm}
        />
      </Stage>
     
      <WarningModal ref={warningModalRef}/>
      <UploadConfirmModal upload={upload} ref={uploadConfirmModalRef}/>
      <ReLoginModal onLogin={update} ref={reLoginModalRefForUpdate}/>
      <ReLoginModal onLogin={upload} ref={reLoginModalRefForUpload}/>
    </>
  )
}

export default CustomLevel;
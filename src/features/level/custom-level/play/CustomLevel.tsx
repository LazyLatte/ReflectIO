import {FC, useRef} from 'react';
import useImage from 'use-image';
import { isAxiosError, isCancel } from 'axios';
import {useLocation} from "react-router-dom";
import {Stage, StageButtonGroup, StageHandle, Mode} from '@features/stage';
import { UserLevelInfo, useLevel, state2info, getMirrorStates } from '@features/level';
import { ReLoginModal, ReLoginModalHandle} from '@features/authentication';
import UploadConfirmModal, {UploadConfirmModalHandle} from './UploadConfirmModal';
import WarningModal, {WarningModalHandle} from './WarningModal';
import { useUpdateLevel, useUploadLevel } from '../api/use-put-level';
import { defaultEmptyLevel } from '../utils';
import SaveImg from '@images/icons/save.svg';
import UploadImg from '@images/icons/upload.svg';

interface CustomLevelProps {}
interface LocationState {userLevelInfo: UserLevelInfo};


const CustomLevel: FC<CustomLevelProps> = () => {
  const { state } = useLocation();
  const {userLevelInfo} = state as LocationState || {userLevelInfo: defaultEmptyLevel};
  const {id} = userLevelInfo;
 
  const level = useLevel(userLevelInfo);
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;
  const levelInfo = state2info(levelState);
  const mirrorStates = getMirrorStates(levelState);

  const reLoginModalRefForUpdate = useRef<ReLoginModalHandle>(null);
  const reLoginModalRefForUpload = useRef<ReLoginModalHandle>(null);
  const uploadConfirmModalRef = useRef<UploadConfirmModalHandle>(null);
  const warningModalRef = useRef<WarningModalHandle>(null);
  
  const stageRef = useRef<StageHandle>(null);

  const updateMutation = useUpdateLevel();
  const uploadMutation = useUploadLevel();


  const update = () => {
    const uri = stageRef.current?.getThumbnail() || '';
    updateMutation.mutate({id, levelInfo, thumbnail: uri.split(',')[1]}, {
      onSuccess: (data) => {
        
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
              console.error(error);
              break;
          }
        }
      }
    })
  }

  const upload = () => {
    const uri = stageRef.current?.getThumbnail() || '';
    uploadMutation.mutate({id, levelInfo, mirrorStates, thumbnail: uri.split(',')[1]}, {
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
              console.error(error);
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

  const updatePreprocess = () => {
    mirrorActions.resetMirrors();
    setTimeout(update, 1000);
  }

  const uploadPreprocess = () => {
    mirrorActions.resetMirrors();
    setTimeout(upload, 1000);
  }


  const [saveImg] = useImage(SaveImg);
  const [uploadImg] = useImage(UploadImg);
  return (
    <>
      <Stage mode={Mode.Custom} level={level} onClear={()=>{}} ref={stageRef}>
        <StageButtonGroup 
          gridHeight={levelState.height} 
          gridWidth={levelState.width} 
          btnImg1={saveImg}
          btnImg2={uploadImg} 
          onClick1={updatePreprocess} 
          onClick2={uploadConfirm}
        />
      </Stage>
     
      <WarningModal ref={warningModalRef}/>
      <UploadConfirmModal uploadPreprocess={uploadPreprocess} ref={uploadConfirmModalRef}/>
      <ReLoginModal onLogin={update} ref={reLoginModalRefForUpdate}/>
      <ReLoginModal onLogin={upload} ref={reLoginModalRefForUpload}/>
    </>
  )
}

export default CustomLevel;
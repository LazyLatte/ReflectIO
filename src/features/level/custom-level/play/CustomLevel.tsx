import {FC, useRef, useState} from 'react';
import useImage from 'use-image';
import { isAxiosError } from 'axios';
import {useLocation} from "react-router-dom";
import {Stage, AnimatedStageButtonGroup, StageHandle, Mode} from '@features/stage';
import { UserLevelInfo, useLevel, state2info, getMirrorStates } from '@features/level';
import { ReLoginModal, ReLoginModalHandle} from '@features/authentication';
import UploadConfirmModal, {UploadConfirmModalHandle} from './UploadConfirmModal';
import VerifyModal, {VerifyModalHandle} from './VerifyModal';
import WarningModal, {WarningModalHandle} from './WarningModal';
import { useUpdateLevel, useUploadLevel } from '../api/use-put-level';
import { defaultEmptyLevel } from '../utils';
import SaveImg from '@images/icons/save.svg';
import UploadImg from '@images/icons/upload.svg';
import LoadingImg from '@images/icons/loading.svg';
import LockImg from '@images/icons/lock.svg';
interface CustomLevelProps {}
interface LocationState {userLevelInfo: UserLevelInfo};


const CustomLevel: FC<CustomLevelProps> = () => {
  const { state } = useLocation();
  const {userLevelInfo} = state as LocationState || {userLevelInfo: defaultEmptyLevel};
  const {id, public: isPublic} = userLevelInfo;
 
  const level = useLevel(userLevelInfo);
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;
  const levelInfo = state2info(levelState);
  const mirrorStates = getMirrorStates(levelState);

  const reLoginModalRefForUpdate = useRef<ReLoginModalHandle>(null);
  const reLoginModalRefForUpload = useRef<ReLoginModalHandle>(null);
  const uploadConfirmModalRef = useRef<UploadConfirmModalHandle>(null);
  const verifyModalRef = useRef<VerifyModalHandle>(null);
  const updateWarningModalRef = useRef<WarningModalHandle>(null);
  const uploadWarningModalRef = useRef<WarningModalHandle>(null);
  const stageRef = useRef<StageHandle>(null);

  const updateMutation = useUpdateLevel();
  const uploadMutation = useUploadLevel();

  const [isUpdating, setIsUpdating] = useState(false);
  const update = () => {
    const uri = stageRef.current?.getThumbnail() || '';
    updateMutation.mutate({id, levelInfo, thumbnail: uri.split(',')[1]}, {
      onSuccess: (data) => {},
      onError: (error) => {
        if(isAxiosError(error)){
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
  const resetAndUpdate = () => {
    mirrorActions.resetMirrors();
    setIsUpdating(true);
    setTimeout(() => {
      update();
      setIsUpdating(false);
    }, 800)
  }
  const updateChecking = () => {
    if(isPublic){
      updateWarningModalRef.current?.open('This level is already in the public. Updating this level will convert it to private mode and reset the number of stars and likes');
    }else{
      resetAndUpdate();
    }
  }
  
  const isUploadReady = id.length > 1 && levelInfo.lasers.length > 0 && levelInfo.targets.length > 0 && levelState.clear;
  const [isUploading, setIsUploading] = useState(false);
  const upload = () => {
    const uri = stageRef.current?.getThumbnail() || '';
    uploadMutation.mutate({id, levelInfo, mirrorStates, thumbnail: uri.split(',')[1]}, {
      onSuccess: (data) => {},
      onError: (error) => {
        if(isAxiosError(error)){
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

  const resetAndUpload = () => {
    mirrorActions.resetMirrors();
    setIsUploading(true);
    setTimeout(() => {
      upload();
      setIsUploading(false);
    }, 800)
  }


  const uploadChecking = () => {
    if(id.length === 1){
      verifyModalRef.current?.open('Guest cannot upload a level');
    }else if(levelInfo.lasers.length <= 0 || levelInfo.targets.length <= 0){
      verifyModalRef.current?.open('The level should contain at least 1 laser and 1 target');
    }else if(!levelState.clear){
      verifyModalRef.current?.open('Level is not clear');
    }else{
      if(isPublic){
        uploadWarningModalRef.current?.open('This level is already in the public. Re-uploading this level will convert it to private mode and reset the number of stars and likes');
      }else{
        uploadConfirmModalRef.current?.open();
      }
    }
  }

  const [saveImg] = useImage(SaveImg);
  const [uploadImg] = useImage(UploadImg);
  const [loadingImg] = useImage(LoadingImg);
  const [lockImg] = useImage(LockImg);
  return (
    <>
      <Stage mode={Mode.Custom} level={level} isGettingThumbnail={isUpdating || isUploading} onClear={()=>{}} ref={stageRef}>
        <AnimatedStageButtonGroup 
          gridHeight={levelState.height} 
          gridWidth={levelState.width} 
          animatedBTN={[
            {
              originalImage: saveImg,
              aninmatedImage: loadingImg,
              animating: isUpdating,
              disabled: false,
              onClick: updateChecking
            },
            {
              originalImage: isUploadReady ? uploadImg : lockImg,
              aninmatedImage: loadingImg,
              animating: isUploading,
              disabled: !isUploadReady,
              onClick: uploadChecking
            }
          ]}
        />
      </Stage>
     
      <VerifyModal ref={verifyModalRef}/>
      <WarningModal onConfirm={resetAndUpdate} ref={updateWarningModalRef}/>
      <WarningModal onConfirm={resetAndUpload} ref={uploadWarningModalRef}/>
      <UploadConfirmModal upload={resetAndUpload} ref={uploadConfirmModalRef}/>
      <ReLoginModal onLogin={resetAndUpdate} ref={reLoginModalRefForUpdate}/>
      <ReLoginModal onLogin={resetAndUpload} ref={reLoginModalRefForUpload}/>
    </>
  )
}

export default CustomLevel;
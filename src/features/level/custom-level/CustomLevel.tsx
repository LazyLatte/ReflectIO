import {FC, useRef, useState} from 'react';
import useImage from 'use-image';
import { isAxiosError } from 'axios';
import {useLocation, Navigate} from "react-router-dom";
import {Stage, AnimatedStageButtonGroup, StageHandle, Mode} from '@features/stage';
import { ReLoginModal, ReLoginModalHandle} from '@features/authentication';
import { UserLevelInfo, getMirrorStates, MirrorStates } from '..';
import useLevel from '../hooks/useLevel';
import {state2info } from './utils';
import ConfirmModal, {ConfirmModalHandle} from './modals/ConfirmModal';
import VerifyModal, { VerifyModalHandle} from './modals/VerifyModal';
import useUpdateLevel from './api/use-update-level';
import useUploadLevel from './api/use-upload-level';
import SaveImg from '@images/icons/save.svg';
import UploadImg from '@images/icons/upload.svg';
import LoadingImg from '@images/icons/loading.svg';
import LockImg from '@images/icons/lock.svg';
interface CustomLevelProps {}
interface LocationState {userLevelInfo: UserLevelInfo};


const CustomLevel: FC<CustomLevelProps> = () => {
  const { state } = useLocation();
  if(!state) return <Navigate to='/' replace/>
  const {userLevelInfo} = state as LocationState;
  const {id} = userLevelInfo;
 
  const level = useLevel(userLevelInfo);
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;
  const levelInfo = state2info(levelState);
  const [isPublic, setIsPublic] = useState<boolean>(userLevelInfo.public);

  const stageRef = useRef<StageHandle>(null);
  const verifyModalRef = useRef<VerifyModalHandle>(null);
  const updateConfirmModalRef = useRef<ConfirmModalHandle>(null);
  const uploadConfirmModalRef = useRef<ConfirmModalHandle>(null);
  const reLoginModalRefForUpdate = useRef<ReLoginModalHandle>(null);
  const reLoginModalRefForUpload = useRef<ReLoginModalHandle>(null);

  const updateMutation = useUpdateLevel();
  const uploadMutation = useUploadLevel();

  const [isUpdating, setIsUpdating] = useState(false);
  const update = () => {
    const uri = stageRef.current?.getThumbnail() || '';
    //console.log(uri);
    updateMutation.mutate({id, levelInfo, thumbnail: uri.split(',')[1]}, {
      onSuccess: () => {
        setIsPublic(false);
      },
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
      updateConfirmModalRef.current?.open('This level is already in the public. Updating this level will convert it to private mode and reset the number of stars and likes', 400);
    }else{
      resetAndUpdate();
    }
  }
  
  const isUploadReady = id.length > 1 && levelInfo.lasers.length > 0 && levelInfo.targets.length > 0 && levelState.clear;
  const [isUploading, setIsUploading] = useState(false);
  const [mirrorsStateBuffer, setMirrorsStateBuffer] = useState<MirrorStates | null>(null);
  const upload = () => {
    const uri = stageRef.current?.getThumbnail() || '';
    const mirrorStates = mirrorsStateBuffer || getMirrorStates(levelState);
    uploadMutation.mutate({id, levelInfo, mirrorStates, thumbnail: uri.split(',')[1]}, {
      onSuccess: () => {
        setMirrorsStateBuffer(null);
        setIsPublic(true);
      },
      onError: (error) => {
        if(isAxiosError(error)){
          switch(error.response?.status){
            case 401:
              reLoginModalRefForUpload.current?.open();
              break;
            case 400:
              alert("PLEASE CLEAR THE LEVEL AGAIN!");
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
    mirrorsStateBuffer === null && setMirrorsStateBuffer(getMirrorStates(levelState));
    mirrorActions.resetMirrors();
    setIsUploading(true);
    setTimeout(() => {
      upload();
      setIsUploading(false);
    }, 800)
  }


  const uploadChecking = () => {
    if(id.length === 1){
      verifyModalRef.current?.open('Guest cannot upload levels');
    }else if(levelInfo.lasers.length <= 0 || levelInfo.targets.length <= 0){
      verifyModalRef.current?.open('The level should contain at least 1 laser and 1 target');
    }else if(!levelState.clear){
      verifyModalRef.current?.open('Level is not clear');
    }else{
      const text = isPublic ? 'This level is already in the public. Re-uploading this level will reset the number of stars and likes' : 'UPLOAD THE LEVEL TO THE PUBLIC?';
      const height = isPublic ? 300 : 200;
      uploadConfirmModalRef.current?.open(text, height);
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
      <ConfirmModal onConfirm={resetAndUpdate} ref={updateConfirmModalRef}/>
      <ConfirmModal onConfirm={resetAndUpload} ref={uploadConfirmModalRef}/>
      <ReLoginModal onLogin={resetAndUpdate} ref={reLoginModalRefForUpdate}/>
      <ReLoginModal onLogin={resetAndUpload} ref={reLoginModalRefForUpload}/>
    </>
  )
}

export default CustomLevel;
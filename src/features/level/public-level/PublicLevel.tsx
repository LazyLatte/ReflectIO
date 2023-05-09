import {useState, useEffect, FC} from 'react'
import { AxiosInstance, isAxiosError } from 'axios';
import {useLocation, useNavigate} from "react-router-dom";
import {Stage, StageButtonGroup, Mode, useStageConfig} from '@features/stage';
import { LevelInfo, UserLevelInfo, useLevel } from '@features/level';
import useAuth from '../../../hooks/useAuth';
import useImage from 'use-image';
import useModalRef from '../../modal/useModalRef';
import RestartImg from '@images/icons/restart.svg';
interface LocationState {userLevelInfo: UserLevelInfo};
interface PublicLevelProps {axiosPrivate: AxiosInstance}
export const PublicLevel: FC<PublicLevelProps> = ({axiosPrivate}) => {
  const {auth} = useAuth()!;
  const navigate = useNavigate();
  const { state } = useLocation();
  const {userLevelInfo} = state as LocationState /*|| {} redirect ...*/;
  const {id, record: worldRecord, personal_best} = userLevelInfo;

  const {shouldRearrange} = useStageConfig();
  const level = useLevel(userLevelInfo, shouldRearrange);

  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;
  

  const {publicLevelClearModalRef, shouldSignInModalRef} = useModalRef();

  const [isFavorite, setIsFavorate] = useState(userLevelInfo.isFavorite);
  const likeReq = async () => {
    if(auth?.accessToken){
      try{
        const response = await axiosPrivate.put(`/levels/like/${id}`);
        setIsFavorate(response.data);
      }catch(err){
        if(isAxiosError(err)){
          if(err.response){
            switch(err.response.status){
              case 401:
                shouldSignInModalRef.current.open(false);
                break;
              default:
                console.error(err)
                break;
            }
          }else if(err.request){
            console.log(err.request);
          }else{
            console.log('Error', err.message);
          }
          console.log(err.config);
        }else{
          console.error(err);
        }

      }
    }else{
      alert('Sign in to add it to your favorite');
    }
  }

  const onClear = async () => {
    const mirrorStates = {
      reflectors: levelState.reflectors.map((mirror, i)=>({pos: mirror.pos, deg: mirror.deg})),
      lenses: levelState.lens.map((mirror, i)=>({pos: mirror.pos, deg: mirror.deg}))
    };
    if(auth?.accessToken){
      try{
        const response = await axiosPrivate.put(`/levels/clear/${id}`, {mirrorStates});
        const new_personal_best = response.data.personal_best;
        navigate(null, { state: {userLevelInfo: {...userLevelInfo, record: Math.min(worldRecord, new_personal_best), personal_best: new_personal_best}}, replace: true });

        const beatWorldRecord = new_personal_best < worldRecord;
        const star = beatWorldRecord ? 4 : 3;
        if(personal_best === null){
          // first clear
          const clearText = beatWorldRecord ? `New World Record : ${new_personal_best}` : 'First Clear';
          publicLevelClearModalRef.current.open(mirrorActions.resetMirrors, clearText, star);
        }else if(new_personal_best < personal_best){
          // second clear
          const clearText = beatWorldRecord ? `New World Record : ${new_personal_best}` : `New Personal Best : ${personal_best} >> ${new_personal_best}`;
          publicLevelClearModalRef.current.open(mirrorActions.resetMirrors, clearText, star);
        }
      }catch(err){
        publicLevelClearModalRef.current.open(mirrorActions.resetMirrors, 'Token Expired', 3, true);
        if(err.response?.status === 401){
          shouldSignInModalRef.current.open(false);
        }else{
          console.error(err);
        }
      }
    }else{
        publicLevelClearModalRef.current.open(mirrorActions.resetMirrors, 'Guest\'s record won\'t be stored', 3, true);
    }
  };
  
  const [restartImg] = useImage(RestartImg);
  const [emptyHeartImg] = useImage('https://www.svgrepo.com/show/433523/heart-so.svg');
  const [fullHeartImg] = useImage('https://www.svgrepo.com/show/503037/heart.svg');
  return (
    <Stage mode={Mode.Public} level={level} onClear={onClear}>
      <StageButtonGroup 
        gridHeight={levelState.height} 
        gridWidth={levelState.width} 
        btnImg1={restartImg}
        btnImg2={isFavorite ? fullHeartImg : emptyHeartImg} 
        onClick1={mirrorActions.resetMirrors} 
        onClick2={likeReq}
      />
    </Stage>
  )
}



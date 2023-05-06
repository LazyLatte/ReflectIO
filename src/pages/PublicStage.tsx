import {useState, useEffect, FC} from 'react'
import { AxiosInstance } from 'axios';
import {useLocation, useNavigate} from "react-router-dom";
import Stage from '../components/stage/Stage';
import StageButtonGroup from '../components/stage/StageButtonGroup';

import {useLevel} from '../hooks/useLevel';
import useAuth from '../hooks/useAuth';
import useImages from '../hooks/useImages';
import useStageConfig from '../hooks/useStageConfig';
import useModalRef from '../hooks/useModalRef';
import { Level, LevelInfo, UserLevelInfo } from '../Interfaces';
interface LocationState {userLevelInfo: UserLevelInfo};
interface PublicStageProps {axiosPrivate: AxiosInstance}
const PublicStage: FC<PublicStageProps> = ({axiosPrivate}) => {
  const {auth} = useAuth()!;
  const navigate = useNavigate();
  const { state } = useLocation();
  const {userLevelInfo} = state as LocationState /*|| {} redirect ...*/;
  const {id, record: worldRecord, personal_best} = userLevelInfo;

  const {shouldRearrange} = useStageConfig();
  const level: Level = useLevel(userLevelInfo, shouldRearrange, false);

  const [levelState, mirrorActions, setTargetClear, setLevelClear, customizationTools] = level;
  
  const {restartImg, emptyHeartImg, fullHeartImg} = useImages()?.StageButtonImages || {};
  const {publicLevelClearModalRef, shouldSignInModalRef} = useModalRef();

  const [isFavorite, setIsFavorate] = useState(userLevelInfo.isFavorite);
  const likeReq = async () => {
    if(auth?.accessToken){
      try{
        const response = await axiosPrivate.put(`/levels/like/${id}`);
        setIsFavorate(response.data);
      }catch(err){
        if(err.response?.status === 401){
          shouldSignInModalRef.current.open(false);
        }else{
          console.error(err);
        }
      }
    }else{
      alert('Sign in to add it to your favorite');
    }
  }

  const clearCallback = async () => {
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
  
  //console.log('personal_best: ', personal_best);
  return (
    <Stage level={level} clearCallback={clearCallback}>
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

export default PublicStage;

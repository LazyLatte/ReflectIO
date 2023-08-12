import {useState, FC, useRef} from 'react'
import useImage from 'use-image';
import { isAxiosError, isCancel } from 'axios';
import {useLocation, useNavigate} from "react-router-dom";
import {Stage, StageButtonGroup, Mode} from '@features/stage';
import { UserLevelInfo, useLevel, getMirrorStates } from '@features/level';
import PublicLevelClearModal, {PublicLevelClearModalHandle} from './PublicLevelClearModal';
import {ReLoginModal, ReLoginModalHandle} from '@features/authentication';
import { useLike } from '../api/useLike';
import { useClear } from '../api/useClear';
import RestartImg from '@images/icons/restart.svg';
import EmptyHeart from '@images/icons/emptyHeart.svg';
import FullHeart from '@images/icons/fullHeart.svg';
interface LocationState {userLevelInfo: UserLevelInfo};
interface PublicLevelProps {}
const PublicLevel: FC<PublicLevelProps> = () => {

  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const {userLevelInfo} = state as LocationState /*|| {} redirect ...*/;
  const {id, record: worldRecord, personal_best, isFavorite} = userLevelInfo;


  const level = useLevel(userLevelInfo);
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;
  const mirrorStates = getMirrorStates(levelState);

  const publicLevelClearModalRef = useRef<PublicLevelClearModalHandle>(null);
  const reLoginModalRefForLike = useRef<ReLoginModalHandle>(null);
  const reLoginModalRefForClear = useRef<ReLoginModalHandle>(null);

  const likeMutation = useLike();
  const clearMutation = useClear();

  const [isLike, setIsLike] = useState(Boolean(isFavorite));
  
  const like = () => {
    likeMutation.mutate({id}, {
      onSuccess: () => {
        setIsLike(prev => !prev);
      },
      onError: (error) => {
        if(isCancel(error)){
          alert("Sign in to add to your favorite!");
        }else if(isAxiosError(error)){
          switch(error.response?.status){
            case 401:
              reLoginModalRefForLike.current?.open();
              break;
            default:
              break;
          }
        }
      }
    })
  }

  const [clearText, setClearText] = useState<string>('');
  const [star, setStar] = useState<number>(3);
  const [warning, setWarning] = useState<boolean>(false);
  const onClear = () => {
    clearMutation.mutate({id, mirrorStates}, {
      onSuccess: (data) => {
        const new_personal_best = data.personal_best;
        const beatWorldRecord = new_personal_best < worldRecord;
        setStar(beatWorldRecord ? 4 : 3);
        setWarning(false);
        if(personal_best === null ){
          setClearText(beatWorldRecord ? `New World Record : ${new_personal_best}` : 'First Clear');
          publicLevelClearModalRef.current?.open();
        }else if(new_personal_best < personal_best){
          setClearText(beatWorldRecord ? `New World Record : ${new_personal_best}` : `New Personal Best : ${personal_best} >> ${new_personal_best}`);
          publicLevelClearModalRef.current?.open();
        }
        publicLevelClearModalRef.current?.open();
        //navigate(pathname, { state: {userLevelInfo: {...userLevelInfo, record: Math.min(worldRecord, new_personal_best), personal_best: new_personal_best}}, replace: true });
        
      }, 
      onError: (error) => {
        if(isCancel(error)){
          setStar(3);
          setWarning(true);
          setClearText('Guest\'s record won\'t be stored');
          publicLevelClearModalRef.current?.open();
        }else if(isAxiosError(error)){
          switch(error.response?.status){
            case 401:
              reLoginModalRefForClear.current?.open();
              break;
            default:
              break;
          }
        }
      }
    })
  }
  
  
  const [restartImg] = useImage(RestartImg);
  const [emptyHeartImg] = useImage(EmptyHeart);
  const [fullHeartImg] = useImage(FullHeart);
  return (
    <>
      <Stage mode={Mode.Public} level={level} onClear={onClear}>
        <StageButtonGroup 
          gridHeight={levelState.height} 
          gridWidth={levelState.width} 
          btn={[
            {
              img: restartImg,
              onClick: mirrorActions.resetMirrors
            },
            {
              img: isLike ? fullHeartImg : emptyHeartImg,
              onClick: like
            }
          ]}
        />
      </Stage>
      <PublicLevelClearModal reset={mirrorActions.resetMirrors} clearText={clearText} star={star} warning={warning} ref={publicLevelClearModalRef}/>
      <ReLoginModal onLogin={like} ref={reLoginModalRefForLike}/>
      <ReLoginModal onLogin={onClear} ref={reLoginModalRefForClear}/>
    </>
  )
}

export default PublicLevel;

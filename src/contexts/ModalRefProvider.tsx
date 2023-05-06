import {FC, useRef, createContext} from 'react';
import WarningModal from '../components/modal/WarningModal';
import AccountModal from '../components/modal/AccountModal';
import UploadConfirmModal from '../components/modal/UploadConfirmModal';
import ShouldSignInModal from '../components/modal/ShouldSignInModal';
import LevelClearModal from '../components/modal/LevelClearModal';
import PublicLevelClearModal from '../components/modal/PublicLevelClearModal';

type ModalRefContextInterface = any;

const ModalRefContext = createContext<ModalRefContextInterface | null>(null);

export const ModalRefProvider: FC<Provider> = ({children}) => {
  const loginRef = useRef(null);
  const warningModalRef = useRef(null);
  const uploadConfirmModalRef = useRef(null);
  const shouldSignInModalRef = useRef(null);
  const levelClearModalRef = useRef(null);
  const publicLevelClearModalRef = useRef(null);
  return (
    <ModalRefContext.Provider value={{loginRef, warningModalRef, uploadConfirmModalRef, shouldSignInModalRef, levelClearModalRef, publicLevelClearModalRef}}>
      {children}
      <AccountModal ref={loginRef}/>
      <WarningModal ref={warningModalRef}/>
      <UploadConfirmModal ref={uploadConfirmModalRef}/>
      <ShouldSignInModal ref={shouldSignInModalRef}/>
      <LevelClearModal ref={levelClearModalRef}/>
      <PublicLevelClearModal ref={publicLevelClearModalRef}/>
    </ModalRefContext.Provider>
  )
}

export default ModalRefContext;
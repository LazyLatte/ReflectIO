import {FC, useRef, createContext} from 'react';
import WarningModal from '@features/level/custom-level/play/WarningModal';
import AccountModal from '@features/authentication/components/AccountModal';
import UploadConfirmModal from '@features/level/custom-level/play/UploadConfirmModal';
import ShouldSignInModal from '@features/authentication/components/ReLoginModal';
import { PublicLevelClearModal } from '@features/level';


type ModalRefContextInterface = any;

const ModalRefContext = createContext<ModalRefContextInterface | null>(null);

export const ModalRefProvider: FC<Provider> = ({children}) => {
  const loginRef = useRef(null);
  const warningModalRef = useRef(null);
  const uploadConfirmModalRef = useRef(null);
  const shouldSignInModalRef = useRef(null);
  const publicLevelClearModalRef = useRef(null);
  return (
    <ModalRefContext.Provider value={{loginRef, warningModalRef, uploadConfirmModalRef, shouldSignInModalRef, publicLevelClearModalRef}}>
      {children}
      <AccountModal ref={loginRef}/>
      <WarningModal ref={warningModalRef}/>
      <UploadConfirmModal ref={uploadConfirmModalRef}/>
      <ShouldSignInModal ref={shouldSignInModalRef}/>
      <PublicLevelClearModal ref={publicLevelClearModalRef}/>
    </ModalRefContext.Provider>
  )
}

export default ModalRefContext;
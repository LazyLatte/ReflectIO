import {FC, useRef, createContext} from 'react';
import WarningModal from '@features/modal/WarningModal';
import AccountModal from '@features/authentication/components/AccountModal';
import UploadConfirmModal from '@features/modal/UploadConfirmModal';
import ShouldSignInModal from '@features/authentication/components/ShouldSignInModal';
import {PublicLevelClearModal} from '@features/level/modals/level-clear';


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
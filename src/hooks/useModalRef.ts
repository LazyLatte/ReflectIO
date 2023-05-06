import {useContext} from 'react';
import ModalRefContext from '../contexts/ModalRefProvider';

const useModalRef = () => {
  return useContext(ModalRefContext);
}

export default useModalRef;
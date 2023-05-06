import {useContext} from 'react';
import ImagesContext from '../contexts/ImagesProvider';

const useImages = () => {
  return useContext(ImagesContext);
}

export default useImages;
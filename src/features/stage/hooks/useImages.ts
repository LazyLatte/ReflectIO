import {useContext} from 'react';
import ImagesContext from '@contexts/ImagesProvider';

export const useImages = () => {
  return useContext(ImagesContext);
}


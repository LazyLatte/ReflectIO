import {FC} from 'react';
import {useState, useEffect, createContext} from 'react';
import useImage from 'use-image';

import LaserRedImg from '../assets/images/lasers/laser-red.png';
import LaserGreenImg from '../assets/images/lasers/laser-green.png';
import LaserBlueImg from '../assets/images/lasers/laser-blue.png';
import LaserYellowImg from '../assets/images/lasers/laser-yellow.png';
import LaserCyanImg from '../assets/images/lasers/laser-cyan.png';
import LaserMagentaImg from '../assets/images/lasers/laser-magenta.png';
import LaserWhiteImg from '../assets/images/lasers/laser-white.png';

import TargetRedImg from '../assets/images/targets/target-red.svg';
import TargetRedActiveImg from '../assets/images/targets/target-red-active.svg';
import TargetGreenImg from '../assets/images/targets/target-green.svg';
import TargetGreenActiveImg from '../assets/images/targets/target-green-active.svg';
import TargetBlueImg from '../assets/images/targets/target-blue.svg';
import TargetBlueActiveImg from '../assets/images/targets/target-blue-active.svg';
import TargetYellowImg from '../assets/images/targets/target-yellow.svg';
import TargetYellowActiveImg from '../assets/images/targets/target-yellow-active.svg';
import TargetCyanImg from '../assets/images/targets/target-cyan.svg';
import TargetCyanActiveImg from '../assets/images/targets/target-cyan-active.svg';
import TargetMagentaImg from '../assets/images/targets/target-magenta.svg';
import TargetMagentaActiveImg from '../assets/images/targets/target-magenta-active.svg';
import TargetWhiteImg from '../assets/images/targets/target-white.svg';
import TargetWhiteActiveImg from '../assets/images/targets/target-white-active.svg';



import ReflectorRedImg from '../assets/images/mirrors/reflector-red-dark.png';
import ReflectorGreenImg from '../assets/images/mirrors/reflector-green-dark.png';
import ReflectorBlueImg from '../assets/images/mirrors/reflector-blue-dark.png';
import ReflectorYellowImg from '../assets/images/mirrors/reflector-yellow-dark.png';
import ReflectorCyanImg from '../assets/images/mirrors/reflector-cyan-dark.png';
import ReflectorMagentaImg from '../assets/images/mirrors/reflector-magenta-dark.png';
import ReflectorWhiteImg from '../assets/images/mirrors/reflector-default-dark.png';

import LensRedImg from '../assets/images/mirrors/reflector-red-dark.png';
import LensGreenImg from '../assets/images/mirrors/reflector-green-dark.png';
import LensBlueImg from '../assets/images/mirrors/reflector-blue-dark.png';
import LensYellowImg from '../assets/images/mirrors/reflector-yellow-dark.png';
import LensCyanImg from '../assets/images/mirrors/reflector-cyan-dark.png';
import LensMagentaImg from '../assets/images/mirrors/reflector-magenta-dark.png';
import LensWhiteImg from '../assets/images/mirrors/lens-default-dark.png';
interface ImagesInterface {
  reflectorImages: (HTMLImageElement | undefined)[];
  lensImages: (HTMLImageElement | undefined)[];
  laserImages: (HTMLImageElement | undefined)[];
  targetImages: (HTMLImageElement | undefined)[][];
}
const ImagesContext = createContext<ImagesInterface | null>(null);

export const ImagesProvider: FC<Provider> = ({children}) => {
  const [images, setImages]  = useState<ImagesInterface | null>(null);


  
  const [reflector_red] = useImage(ReflectorRedImg);
  const [reflector_green] = useImage(ReflectorGreenImg);
  const [reflector_blue] = useImage(ReflectorBlueImg);
  const [reflector_yellow] = useImage(ReflectorYellowImg);
  const [reflector_cyan] = useImage(ReflectorCyanImg);
  const [reflector_magenta] = useImage(ReflectorMagentaImg);
  const [reflector_white] = useImage(ReflectorWhiteImg);

  const [lens_red] = useImage(LensRedImg);
  const [lens_green] = useImage(LensGreenImg);
  const [lens_blue] = useImage(LensBlueImg);
  const [lens_yellow] = useImage(LensYellowImg);
  const [lens_cyan] = useImage(LensCyanImg);
  const [lens_magenta] = useImage(LensMagentaImg);
  const [lens_white] = useImage(LensWhiteImg);
  

  const [laser_blue] = useImage(LaserBlueImg);
  const [laser_green] = useImage(LaserGreenImg);
  const [laser_cyan] = useImage(LaserCyanImg);
  const [laser_red] = useImage(LaserRedImg);
  const [laser_magenta] = useImage(LaserMagentaImg);
  const [laser_yellow] = useImage(LaserYellowImg);
  const [laser_white] = useImage(LaserWhiteImg);

  const [target_blue] = useImage(TargetBlueImg);
  const [target_blue_active] = useImage(TargetBlueActiveImg);

  const [target_red] = useImage(TargetRedImg);
  const [target_red_active] = useImage(TargetRedActiveImg);

  const [target_green] = useImage(TargetGreenImg);
  const [target_green_active] = useImage(TargetGreenActiveImg);

  const [target_yellow] = useImage(TargetYellowImg);
  const [target_yellow_active] = useImage(TargetYellowActiveImg);

  const [target_cyan] = useImage(TargetCyanImg);
  const [target_cyan_active] = useImage(TargetCyanActiveImg);

  const [target_magenta] = useImage(TargetMagentaImg);
  const [target_magenta_active] = useImage(TargetMagentaActiveImg);

  const [target_white] = useImage(TargetWhiteImg);
  const [target_white_active] = useImage(TargetWhiteActiveImg);

  useEffect(()=>{
    const targetImages = [[undefined, undefined], [target_blue, target_blue_active], [target_green, target_green_active], [target_cyan, target_cyan_active], [target_red, target_red_active], 
                        [target_magenta, target_magenta_active], [target_yellow, target_yellow_active], [target_white, target_white_active]];
    setImages({
      reflectorImages: [undefined, reflector_blue, reflector_green, reflector_cyan, reflector_red, reflector_magenta, reflector_yellow, reflector_white],
      lensImages: [undefined, lens_blue, lens_green, lens_cyan, lens_red, lens_magenta, lens_yellow, lens_white],
      laserImages: [undefined, laser_blue, laser_green, laser_cyan, laser_red, laser_magenta, laser_yellow, laser_white],
      targetImages: targetImages
    })
  }, [laser_blue, laser_green, laser_cyan, laser_red, laser_magenta, laser_yellow, laser_white,
      reflector_blue, reflector_green, reflector_cyan, reflector_red, reflector_magenta, reflector_yellow, reflector_white,
      lens_blue, lens_green, lens_cyan, lens_red, lens_magenta, lens_yellow, lens_white,
      target_blue, target_blue_active, target_red, target_red_active, target_green, target_green_active, 
      target_yellow, target_yellow_active, target_cyan, target_cyan_active, target_white, target_white_active]);
  return (
    <ImagesContext.Provider value={images}>
      {children}
    </ImagesContext.Provider>
  )
}

export default ImagesContext;
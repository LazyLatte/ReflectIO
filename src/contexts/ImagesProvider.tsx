import {FC} from 'react';
import {useState, useEffect, createContext} from 'react';
import useImage from 'use-image';
import BulbImg from '../assets/images/icons/bulb.svg';
import RestartImg from '../assets/images/icons/restart.svg';
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

import ReflectorImg from '../assets/images/mirrors/reflector-default-dark.png';
import LensImg from '../assets/images/mirrors/lens-default-dark.png';
interface ImagesInterface {
  mirrorImages: (HTMLImageElement | undefined)[];
  laserImages: (HTMLImageElement | undefined)[];
  targetImages: (HTMLImageElement | undefined)[][];
  StageButtonImages: {
    bulbImg: HTMLImageElement | undefined;
    restartImg: HTMLImageElement | undefined;
    saveImg: HTMLImageElement | undefined;
    uploadImg: HTMLImageElement | undefined;
    emptyHeartImg: HTMLImageElement | undefined;
    fullHeartImg: HTMLImageElement | undefined;
  } ;
}
const ImagesContext = createContext<ImagesInterface | null>(null);

export const ImagesProvider: FC<Provider> = ({children}) => {
  const [images, setImages]  = useState<ImagesInterface | null>(null);

  const [restartImg] = useImage(RestartImg);
  const [bulbImg] = useImage(BulbImg);
  
  const [saveImg] = useImage('https://www.svgrepo.com/show/509215/save-alt.svg');
  const [uploadImg] = useImage('https://www.svgrepo.com/show/502880/upload-2.svg');

  const [emptyHeartImg] = useImage('https://www.svgrepo.com/show/433523/heart-so.svg');
  const [fullHeartImg] = useImage('https://www.svgrepo.com/show/503037/heart.svg');

  const [reflector] = useImage(ReflectorImg);
  const [lens] = useImage(LensImg);

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
      mirrorImages: [reflector, lens],
      laserImages: [undefined, laser_blue, laser_green, laser_cyan, laser_red, laser_magenta, laser_yellow, laser_white],
      targetImages: targetImages,
      StageButtonImages: {bulbImg, restartImg, saveImg, uploadImg, emptyHeartImg, fullHeartImg}
    })
  }, [bulbImg, restartImg, emptyHeartImg, fullHeartImg, saveImg, uploadImg,
      reflector, lens, target_blue, target_blue_active, target_red, target_red_active, target_green, target_green_active, 
      target_yellow, target_yellow_active, target_cyan, target_cyan_active, target_white, target_white_active,
      laser_blue, laser_green, laser_cyan, laser_red, laser_magenta, laser_yellow, laser_white]);
  return (
    <ImagesContext.Provider value={images}>
      {children}
    </ImagesContext.Provider>
  )
}

export default ImagesContext;
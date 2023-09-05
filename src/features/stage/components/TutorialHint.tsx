import {FC, useState, useEffect} from 'react';
import useImage from 'use-image';
import { Image} from 'react-konva';
import { Spring, animated, easings } from '@react-spring/konva';
import { Vector2D, Mode, ObjectType } from '../interfaces';
import {useStageConfig, useImages} from '../hooks';
import { TutorialGoal } from '@features/level';
import TapImg from '@images/icons/tap.svg';
import MouseImg from '@images/icons/mouse.svg';
import LeftClickImg from '@images/icons/left-click.svg';
import RightClickImg from '@images/icons/right-click.svg';
interface TutorialHintProps {
  mode: Mode;
  tutorialGoal: TutorialGoal | undefined;
}
interface DegHintProps {type: ObjectType.Reflector | ObjectType.Lens, pos: Vector2D, deg: number};
interface PosHintProps {type: ObjectType.Reflector | ObjectType.Lens, fromPos: Vector2D, toPos: Vector2D};
const PosHint: FC<PosHintProps> = ({type, fromPos, toPos}) => {
  const [tapImg] = useImage(TapImg);
  const image = type === ObjectType.Reflector ? useImages()?.reflectorImages[7] : useImages()?.lensImages[7];
  const {cellWidth} = useStageConfig();
  return (
    <Spring
      from={{ 
        x: fromPos.x * cellWidth, 
        y: fromPos.y * cellWidth
      }}
      to={{
        x: toPos.x * cellWidth,
        y: toPos.y * cellWidth,
        shadowBlur:  0,
        fill: 'transparent',
        width: cellWidth,
        height: cellWidth,
      }}
      config={{easing: easings.easeInOutSine, duration: 1800}}
      delay={500}
      loop
    >
      {(props) => (
          <animated.Group {...props} image={tapImg}>
            <Image 
              image={tapImg} 
              x={cellWidth * 0.4}
              y={cellWidth * 0.4}
              width={cellWidth}
              height={cellWidth}
            />
            <Image
              image={image} 
              x={cellWidth * 0.1}
              y={cellWidth * 0.1}
              width={cellWidth * 0.8}
              height={cellWidth * 0.8}
              opacity={0.4}
            />
          </animated.Group>
      )}
    </Spring>
  )
}

const DegHint: FC<DegHintProps> = ({type, pos, deg}) => {
  const [mousImg] = useImage(MouseImg);
  const [leftClickImg] = useImage(LeftClickImg);
  const [rightClickImg] = useImage(RightClickImg);
  const halfDeg = type === ObjectType.Reflector ? 180 : 90;
  const images = [mousImg, deg <= halfDeg ? leftClickImg : rightClickImg] as const;
  const [imgIdx, setImgIdx] =useState(1);
  useEffect(()=>{
    const id1 = setInterval(() => setImgIdx(1), 1600);
    let id2: NodeJS.Timer;
    setTimeout(() => {
      setImgIdx(0);
      id2 = setInterval(() => setImgIdx(0), 1600);
    }, 500)
    return () => {
      clearInterval(id1);
      clearInterval(id2);
    }
  }, []);
  const {cellWidth} = useStageConfig();
  return (
    <Image 
      image={images[imgIdx]} 
      x={(pos.x + 0.6) * cellWidth}
      y={(pos.y + 0.6) * cellWidth}
      width={cellWidth}
      height={cellWidth}
    />
  )
}

const TutorialHint: FC<TutorialHintProps> = ({mode, tutorialGoal}) => {
  if(mode !== Mode.Tutorial || tutorialGoal === undefined) return null;
  const {match, type, fromPos, toPos, toDeg} = tutorialGoal;
  switch(match){
    case "pos": return <PosHint type={type} fromPos={fromPos} toPos={toPos} />;
    case "deg": return <DegHint type={type} pos={toPos} deg={toDeg}/>;
    default: return null;
  }
}

export default TutorialHint;
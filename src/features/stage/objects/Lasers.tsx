import {FC, memo} from 'react';
import Object from './Object';
import { Group, Image } from 'react-konva';
import {Laser, Mode, LaserActions} from '../interfaces';
import {useStageConfig, useImages} from '../hooks';
import {laserDirectionToDegree} from "../gameHelpers";
interface LaserProps {
  mode: Mode;
  laserActions: LaserActions;
  isValidCell: (pos: Vector2D) => boolean;
}

const Laser: FC<LaserProps & {laser: Laser}> = memo(({mode, laser, laserActions, isValidCell}) => {
  const {pos, dir, color} = laser;
  const {rotateLaser, updateLaserPos, deleteLaser} = laserActions;
  const laserImages = useImages()?.laserImages || [];
  const {cellWidth} = useStageConfig();

  return (
    <Object
      pos={pos}
      draggable={mode === Mode.Custom}
      cursor={mode === Mode.Custom}
      isValidCell={isValidCell}
      updatePos={(newPos) => updateLaserPos(pos, newPos)}
      onClick={(e)=>{
        if(mode === Mode.Custom){
          if(e.evt.button === 0){
            rotateLaser(pos);
          }else if(e.evt.button === 2){
            deleteLaser(pos);
          }
        }
      }}
    >
      <Image 
        image={laserImages[color]}
        offsetX={cellWidth*0.5}
        offsetY={cellWidth*0.5}
        x={cellWidth*0.5} 
        y={cellWidth*0.5} 
        width={cellWidth} 
        height={cellWidth} 
        rotation={laserDirectionToDegree(dir)}
      />
    </Object>
  );
})

const Lasers: FC<LaserProps & {lasers: Laser[]}> = (props) => (
  <Group>
    {props.lasers.map((laser, i) => <Laser {...props} laser={laser} key={i}/>)}
  </Group>
);


export default Lasers;

import {FC, useEffect, createRef, memo} from 'react';
import { Group, Image } from 'react-konva';
import Konva from 'konva';
import {Laser, Mode, LaserActions, Vector2D} from '../interfaces';
import {useStageConfig, useImages} from '../hooks';
import {laserDirectionToDegree} from "../gameHelpers";
interface LaserProps {
  mode: Mode;
  laser: Laser;
  laserActions: LaserActions;
  isValidCell: (pos: Vector2D) => boolean;
}
interface LasersProps{
  mode: Mode;
  lasers: Laser[];
  laserActions: LaserActions;
  isValidCell: (pos: Vector2D) => boolean;
}

const Laser: FC<LaserProps> = memo(({mode, laser, laserActions, isValidCell}) => {
  const {pos, dir, color} = laser;
  const {rotateLaser, updateLaserPos, deleteLaser} = laserActions;
  const laserRef = createRef<Konva.Group>();
  const laserImages = useImages()?.laserImages || [];
  const {cellWidth} = useStageConfig();

  useEffect(() => {
    laserRef.current?.position({ x: pos.x * cellWidth, y: pos.y * cellWidth });
  }, [pos, cellWidth]);

  return (
    <Group
      ref={laserRef}
      x={pos.x * cellWidth}
      y={pos.y * cellWidth}
      draggable={mode === Mode.Custom}
      onDragEnd={(e) => {
        const newPos: Vector2D = {x: Math.round(e.target.x() / cellWidth), y: Math.round(e.target.y() / cellWidth)};
        if (isValidCell(newPos)) {
          updateLaserPos(pos, newPos);
        } else {
          laserRef.current?.position({
            x: pos.x * cellWidth,
            y: pos.y * cellWidth,
          });
        }
      }}
      onMouseEnter={(e) => {
        if(mode === Mode.Custom){
          const container = e.target.getStage()?.container();
          container && (container.style.cursor = 'pointer');
        }
      }}
      onMouseLeave={(e) => {
        if(mode === Mode.Custom){
          const container = e.target.getStage()?.container();
          container && (container.style.cursor = 'default');
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
        onClick={(e)=>{
          if(mode === Mode.Custom){
            if(e.evt.button === 0){
              rotateLaser(pos, 45);
            }else if(e.evt.button === 2){
              deleteLaser(pos);
            }
          }
        }}
        
      />
    </Group>
  );
})

const Lasers: FC<LasersProps> = ({mode, lasers, laserActions, isValidCell}) => {
  return (
    <Group>
      {lasers.map((laser, i) => (
        <Laser mode={mode} laser={laser} laserActions={laserActions} isValidCell={isValidCell} key={i}/>
      ))}
    </Group>
  );
}

export default Lasers;

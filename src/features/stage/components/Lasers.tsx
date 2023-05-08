import {FC, memo} from 'react';
import { Group, Image } from 'react-konva';
import {Laser, Mode, LaserActions} from '../interfaces';
import {useStageConfig, useImages} from '../hooks';
import {laserDirectionToDegree} from "../gameHelpers";
interface LasersProps {
  mode: Mode;
  lasers: Laser[];
  laserActions: LaserActions;
}

const Lasers: FC<LasersProps> = memo(({mode, lasers, laserActions}) => {
  const {rotateLaser, deleteLaser} = laserActions;
  const laserImages = useImages()?.laserImages || [];
  const {cellWidth} = useStageConfig();
  //console.log('Laser');
  return (
    <Group>
      {lasers.map((laser, i)=>(
        <Group
          x={laser.pos.x * cellWidth}
          y={laser.pos.y * cellWidth}
          key={i}
        >
          <Image 
            image={laserImages[laser.color]}
            offsetX={cellWidth*0.5}
            offsetY={cellWidth*0.5}
            x={cellWidth*0.5} 
            y={cellWidth*0.5} 
            width={cellWidth} 
            height={cellWidth} 
            rotation={laserDirectionToDegree(laser.dir)}
            onClick={(e)=>{
              if(mode === Mode.Custom){
                if(e.evt.button === 0){
                  rotateLaser(laser.pos, 45);
                }else if(e.evt.button === 2){
                  deleteLaser(laser.pos);
                }
              }
            }}
            
          />
        </Group>
      ))}
    </Group>
  );
})

export default Lasers;

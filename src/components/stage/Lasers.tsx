import {FC, memo} from 'react';
import { Group, Image } from 'react-konva';
import {Laser, CustomizationTools} from '../../Interfaces';
import useStageConfig from '../../hooks/useStageConfig';
import useImages from '../../hooks/useImages';
import {laserDirectionToDegree} from "../../gameHelpers";
interface LasersProps {
  lasers: Laser[];
  customizationTools: CustomizationTools;
}

const Lasers: FC<LasersProps> = memo(({lasers, customizationTools}) => {
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
              if(customizationTools){
                if(e.evt.button === 0){
                  customizationTools.rotateLaser(laser.pos, 45);
                }else if(e.evt.button === 2){
                  customizationTools.deleteLaser(laser.pos);
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

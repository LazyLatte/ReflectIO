import { Group, Image } from 'react-konva';
import {FC, Dispatch, SetStateAction, memo} from 'react';
import {Target, CustomizationTools} from '../../Interfaces';
import useStageConfig from '../../hooks/useStageConfig';
import useImages from '../../hooks/useImages';
const targetImgScaleFactor = 800;
interface TargetsProps {
  targets: Target[];
  setMouseOnTarget: Dispatch<SetStateAction<Target | null>>;
  customizationTools: CustomizationTools;
}


const Targets: FC<TargetsProps> = memo(({targets, setMouseOnTarget, customizationTools}) => {
  const targetImages = useImages()?.targetImages || [];
  const {cellWidth} = useStageConfig();
 //console.log('Target')
  return (
    <Group>
      {targets.map((target, i)=>(
          <Image 
            x={target.pos.x * cellWidth} 
            y={target.pos.y * cellWidth} 
            image={targetImages[target.color][target.clear ? 1 : 0]} 
            scale={{x: cellWidth / targetImgScaleFactor, y: cellWidth / targetImgScaleFactor}}
            onmouseover = {()=>setMouseOnTarget(target)}
            onmouseout = {()=>setMouseOnTarget(null)}
            onClick={(e)=>{
              if(customizationTools && e.evt.button === 2){
                setMouseOnTarget(null);
                customizationTools.deleteTarget(target.pos);
              }
            }}

            key={i}
          />
      ))}
    </Group>
  );
})

export default Targets;
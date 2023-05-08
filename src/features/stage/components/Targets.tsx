import { Group, Image } from 'react-konva';
import {FC, Dispatch, SetStateAction, memo} from 'react';
import {Mode, Target, TargetActions} from '../interfaces';
import {useStageConfig, useImages} from '../hooks';

interface TargetsProps {
  mode: Mode;
  targets: Target[];
  setMouseOnTarget: Dispatch<SetStateAction<Target | null>>;
  targetActions: TargetActions;
}

const targetImgScaleFactor = 800;
const Targets: FC<TargetsProps> = memo(({mode, targets, setMouseOnTarget, targetActions}) => {
  const {deleteTarget} = targetActions;
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
              if(mode === Mode.Custom && e.evt.button === 2){
                setMouseOnTarget(null);
                deleteTarget(target.pos);
              }
            }}

            key={i}
          />
      ))}
    </Group>
  );
})

export default Targets;
import {FC, Dispatch, SetStateAction, memo} from 'react';
import { Group, Image } from 'react-konva';
import Object from './Object';
import {Mode, Target, TargetActions, Vector2D} from '../interfaces';
import {useStageConfig, useImages} from '../hooks';
interface TargetProps {
  mode: Mode;
  targetActions: TargetActions;
  isValidCell: (pos: Vector2D) => boolean;
  setMouseOnTarget: Dispatch<SetStateAction<Target | null>>;
}


const targetImgScaleFactor = 800;
const Target: FC<TargetProps & {target: Target}> = memo(({mode, target, targetActions, isValidCell, setMouseOnTarget}) => {
  const {pos, color, clear} = target;
  const {updateTargetPos, deleteTarget} = targetActions;
  const targetImages = useImages()?.targetImages || [];
  const {cellWidth} = useStageConfig();
 //console.log('Target')
  return (
    <Object
      pos={pos}
      draggable={mode === Mode.Custom}
      cursor={mode === Mode.Custom}
      isValidCell={isValidCell}
      updatePos={(newPos) => updateTargetPos(pos, newPos)}
      onClick={(e)=>{
        if(mode === Mode.Custom && e.evt.button === 2){
          setMouseOnTarget(null);
          deleteTarget(target.pos);
        }
      }}
    >
      <Image 
        image={targetImages[color][clear ? 1 : 0]} 
        scale={{x: cellWidth / targetImgScaleFactor, y: cellWidth / targetImgScaleFactor}}
        onmouseover = {() => mode !== Mode.Custom && setMouseOnTarget(target)}
        onmouseout = {() => mode !== Mode.Custom && setMouseOnTarget(null)}
      />
    </Object>
  );
})

const Targets: FC<TargetProps & {targets: Target[]}> = (props) => (
  <Group>
    {props.targets.map((target, i) => <Target {...props} target={target} key={i}/>)}
  </Group>
);

export default Targets;
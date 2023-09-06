import { FC, useLayoutEffect } from 'react';
import Object from './Object';
import { Group, Image } from 'react-konva';
import {useStageConfig, useImages} from '../hooks';
import {Mode, Mirror as MirrorState, MirrorActions, Vector2D, ObjectType} from '../interfaces';
interface MirrorProps {
  mode: Mode;
  mirrorActions: MirrorActions;
  isDraggable: (pos: Vector2D) => boolean;
  isDisabled: (pos: Vector2D) => boolean;
  isOnBoard: (pos: Vector2D) => boolean;
  isValidCell: (pos: Vector2D) => boolean;
}

const Mirror: FC<MirrorProps & {mirror: MirrorState}> = ({mode, mirror, mirrorActions, isDraggable, isDisabled, isOnBoard, isValidCell}) => {
  const { type, idx, pos, resetPos, deg } = mirror;
  const {rotateMirror, updateMirrorPos, deleteMirror} = mirrorActions;
  const {cellWidth, shouldRearrange} = useStageConfig();

  useLayoutEffect(() => {
    if (!isOnBoard(pos)) {
      updateMirrorPos(type, idx, resetPos);
    }
  }, [resetPos]);


  const image = type === ObjectType.Reflector ? useImages()?.reflectorImages[7] : useImages()?.lensImages[7];
  //console.log(deg);
  return (
    <Object
      pos={pos}
      draggable={isDraggable(pos)}
      cursor
      isValidCell={isValidCell}
      updatePos={(newPos) => updateMirrorPos(type, idx, newPos)}
      onClick={(e) => {
        if(isDisabled(pos)) return;
        if(e.evt.button === 0){
          rotateMirror(type, idx, 45);
        }else if(e.evt.button === 2){
          if(mode === Mode.Custom){
            deleteMirror(type, idx, shouldRearrange);
          }else{
            rotateMirror(type, idx, 315);
          }
        }
      }}
    >
      <Image 
        image={image} 
        offsetX={cellWidth * 0.8 * 0.5}
        offsetY={cellWidth * 0.8 * 0.5}
        x={cellWidth * 0.5}
        y={cellWidth * 0.5}
        width={cellWidth * 0.8}
        height={cellWidth * 0.8}
        rotation={deg} 
      />
    </Object>
  );
};

const Mirrors: FC<MirrorProps & {mirrors: MirrorState[]}> = (props) => (
  <Group>
    {props.mirrors.map((mirror, i) => <Mirror {...props} mirror={mirror} key={i}/>)}
  </Group>
);

export default Mirrors;
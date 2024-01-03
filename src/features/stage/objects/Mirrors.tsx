import { FC, useLayoutEffect } from 'react';
import Object from './Object';
import { Group, Image } from 'react-konva';
import {useStageConfig, useImages} from '../hooks';
import {Mode, Mirror as MirrorInterface, MirrorActions, ObjectType} from '../interfaces';
interface MirrorProps {
  mode: Mode;
  mirrorActions: MirrorActions;
  isDraggable: (pos: Vector2D) => boolean;
  isDisabled: (pos: Vector2D) => boolean;
  isOnBoard: (pos: Vector2D) => boolean;
  isValidCell: (pos: Vector2D) => boolean;
}

const Mirror: FC<MirrorProps & {mirror: MirrorInterface}> = ({mode, mirror, mirrorActions, isDraggable, isDisabled, isOnBoard, isValidCell}) => {
  const { type, idx, pos, resetPos, deg, color } = mirror;
  const {rotateMirror, updateMirrorPos, deleteMirror} = mirrorActions;
  const {cellWidth, shouldRearrange} = useStageConfig();

  useLayoutEffect(() => {
    if (!isOnBoard(pos)) {
      updateMirrorPos(type, idx, resetPos);
    }
  }, [resetPos]);


  const image = type === ObjectType.Reflector ? useImages()?.reflectorImages[color] : useImages()?.lensImages[color];
  //console.log(deg);
  return (
    <Object
      cursor
      pos={pos}
      draggable={isDraggable(pos)}
      isValidCell={isValidCell}
      updatePos={(newPos) => updateMirrorPos(type, idx, newPos)}
      onClick={(e) => {
        if(isDisabled(pos)) return;
        if(e.evt.button === 0){
          rotateMirror(type, idx, true);
        }else if(e.evt.button === 2){
          if(mode === Mode.Custom){
            deleteMirror(type, idx, shouldRearrange);
          }else{
            rotateMirror(type, idx, false);
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

const Mirrors: FC<MirrorProps & {mirrors: MirrorInterface[]}> = (props) => (
  <Group>
    {props.mirrors.map((mirror, i) => <Mirror {...props} mirror={mirror} key={i}/>)}
  </Group>
);

export default Mirrors;
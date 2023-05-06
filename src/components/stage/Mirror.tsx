import { FC, createRef, useEffect } from 'react';
import { Group, Image } from 'react-konva';
import Konva from 'konva';
import useStageConfig from '../../hooks/useStageConfig';
import useImages from '../../hooks/useImages';
import {ObjectType} from '../../Enums';
import {Mirror as MirrorState, MirrorActions, CustomizationTools, Vector2D} from '../../Interfaces';
interface MirrorProps {
  mirror: MirrorState;
  mirrorActions: MirrorActions;
  validRange: Vector2D;
  isEmptyCell: (pos: Vector2D) => boolean;
  customizationTools: CustomizationTools;
}

const Mirror: FC<MirrorProps> = ({mirror, mirrorActions, validRange, isEmptyCell, customizationTools}) => {
  const { type, idx, pos, resetPos, deg } = mirror;
  const {rotateMirror, updateMirrorPos} = mirrorActions;

  const {cellWidth} = useStageConfig();

  const mirrorRef = createRef<Konva.Group>();
  useEffect(() => {
    if (pos.x >= validRange.x || pos.y >= validRange.y) {
      updateMirrorPos(type, idx, resetPos);
    }
  }, [resetPos]);
  useEffect(() => {
    mirrorRef.current?.position({ x: pos.x * cellWidth, y: pos.y * cellWidth });
  }, [pos, cellWidth]);



  const image = type === ObjectType.Reflector ? useImages()?.mirrorImages[0] : useImages()?.mirrorImages[1];
  return (
    <Group
      ref={mirrorRef}
      x={pos.x * cellWidth}
      y={pos.y * cellWidth}
      width={cellWidth}
      height={cellWidth}
      draggable
      onDragEnd={(e) => {
        const newPos: Vector2D = {x: Math.round(e.target.x() / cellWidth), y: Math.round(e.target.y() / cellWidth)};
        if (newPos.x >= 0 && newPos.x < validRange.x && newPos.y >= 0 && newPos.y < validRange.y && isEmptyCell(newPos)) {
          updateMirrorPos(type, idx, newPos);
        } else {
          mirrorRef.current?.position({
            x: pos.x * cellWidth,
            y: pos.y * cellWidth,
          });
        }
      }}
      onClick={(e) => {
        if(e.evt.button === 0){
          rotateMirror(type, idx, 45);
        }else if(e.evt.button === 2){
          if(customizationTools){
            customizationTools.deleteMirror(type, idx);
          }else{
            rotateMirror(type, idx, 315);
          }
        }
        
      }}
      onMouseEnter={(e) => {
        const container = e.target.getStage()?.container();
        container && (container.style.cursor = 'pointer');
      }}
      onMouseLeave={(e) => {
        const container = e.target.getStage()?.container();
        container && (container.style.cursor = 'default');
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
    </Group>
  );
};

export default Mirror;
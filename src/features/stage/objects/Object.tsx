import {FC, useEffect, createRef, memo, ReactNode} from 'react';
import { Group } from 'react-konva';
import Konva from 'konva';
import {useStageConfig} from '../hooks';
interface ObjectProps {
  pos: Vector2D;
  draggable?: boolean;
  cursor?: boolean;
  children: ReactNode;
  isValidCell: (pos: Vector2D) => boolean;
  updatePos: (newPos: Vector2D) => void;
  onClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;
}

const Object: FC<ObjectProps> = memo(({pos, draggable, cursor, children, isValidCell, updatePos, onClick}) => {
  const objectRef = createRef<Konva.Group>();
  const {cellWidth} = useStageConfig();

  useEffect(() => {
    objectRef.current?.position({ x: pos.x * cellWidth, y: pos.y * cellWidth });
  }, [pos, cellWidth]);

  return (
    <Group
      ref={objectRef}
      x={pos.x * cellWidth}
      y={pos.y * cellWidth}
      width={cellWidth}
      height={cellWidth}
      draggable={Boolean(draggable)}
      onDragEnd={(e) => {
        const newPos: Vector2D = {x: Math.round(e.target.x() / cellWidth), y: Math.round(e.target.y() / cellWidth)};
        if (isValidCell(newPos)) {
            updatePos(newPos);
        } else {
            objectRef.current?.position({
            x: pos.x * cellWidth,
            y: pos.y * cellWidth,
          });
        }
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if(Boolean(cursor)){
          const container = e.target.getStage()?.container();
          container && (container.style.cursor = 'pointer');
        }
      }}
      onMouseLeave={(e) => {
        if(Boolean(cursor)){
          const container = e.target.getStage()?.container();
          container && (container.style.cursor = 'default');
        }
      }}
    >
        {children}
    </Group>
  );
})


export default Object;

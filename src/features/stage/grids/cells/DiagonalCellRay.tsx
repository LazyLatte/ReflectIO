import {FC} from 'react';
import { Group } from 'react-konva';
import {useStageConfig} from '../../hooks';
import {Cell} from '../../interfaces';
import Ray, {Position} from './Ray';
interface DiagonalCellRayProps {
  cell: Cell;
  i: number;
  j: number;
}
const inv_sqrt2 = 0.70710678118;
const DiagonalCellRay: FC<DiagonalCellRayProps> = ({cell, i, j}) => {
  const {topColor, rightColor, bottomColor, leftColor, object} = cell;
  const {cellWidth} = useStageConfig();

  const diagonalCellWidth = cellWidth * inv_sqrt2;
  return (
    <Group
      x={j*diagonalCellWidth} 
      y={i*diagonalCellWidth} 
      width={diagonalCellWidth} 
      height={diagonalCellWidth} 
    >
      <Ray color={topColor} object={object} position={Position.Top} diagonal/>
      <Ray color={rightColor} object={object} position={Position.Right} diagonal/>
      <Ray color={bottomColor} object={object} position={Position.Bottom} diagonal/>
      <Ray color={leftColor} object={object} position={Position.Left} diagonal/>
    </Group>
  );
}

export default DiagonalCellRay;
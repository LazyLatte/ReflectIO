import {FC} from 'react';
import { Group} from 'react-konva';
import {useStageConfig} from '../../hooks';
import {Cell} from '../../interfaces';
import Ray, {Position} from './Ray';
interface CellRayProps {
  cell: Cell;
  i: number;
  j: number;
}
const CellRay: FC<CellRayProps> = ({cell, i, j}) => {
  const {topColor, rightColor, bottomColor, leftColor, object} = cell;
  const {cellWidth} = useStageConfig();  
  return (
    <Group
      x={j*cellWidth} 
      y={i*cellWidth} 
      width={cellWidth} 
      height={cellWidth} 
    >
      <Ray color={topColor} object={object} position={Position.Top}/>
      <Ray color={rightColor} object={object} position={Position.Right}/>
      <Ray color={bottomColor} object={object} position={Position.Bottom}/>
      <Ray color={leftColor} object={object} position={Position.Left}/>
    </Group>
  );
}

export default CellRay;
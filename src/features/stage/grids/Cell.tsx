import {FC} from 'react';
import { Group, Rect } from 'react-konva';
import {colorMap, mirrorNormalVectorToDegree} from '../gameHelpers';
import {useStageConfig} from '../hooks';
import {ObjectType, CellRay} from '../interfaces';
interface CellProps {
  cell: CellRay;
  i: number;
  j: number;
}
const inv_sqrt2 = 0.70710678118;
const Cell: FC<CellProps> = ({cell, i, j}) => {
  const {color} = cell;
  const {cellWidth} = useStageConfig();
  const rayLengthFactor = 0.5;
  const rayWidthFactor = 0.1 * inv_sqrt2;
  

  let horizontalRayLengthFactor = 1;
  let verticalRayLengthFactor = 1;
  if(cell.object.type === ObjectType.Lens){
    const cutFactor = 0.35;
    const normalVector = cell.object.nv || {x: 0, y: 0};
    const deg = mirrorNormalVectorToDegree(normalVector);
    if(deg === 0 || deg === 180){
      verticalRayLengthFactor *= cutFactor;
    }else if(deg === 90 || deg === 270){
      horizontalRayLengthFactor *= cutFactor;
    }
  }
  return (
    <Group
      x={j*cellWidth} 
      y={i*cellWidth} 
      width={cellWidth} 
      height={cellWidth} 
    >
        <Rect 
          className = 'top'
          x = {cellWidth * (1 - rayWidthFactor) * 0.5}
          y = {0}
          width={cellWidth * rayWidthFactor} 
          height={cellWidth * rayLengthFactor * verticalRayLengthFactor} 
          fill= {colorMap[(color >> 9) & 7]}
          shadowColor={colorMap[(color >> 9) & 7]}
          shadowBlur={5}
          globalCompositeOperation='lighter'
        />

        <Rect 
          className = 'right'
          x = {cellWidth * (1 - rayLengthFactor * horizontalRayLengthFactor)}
          y = {cellWidth * (1 - rayWidthFactor) * 0.5}
          width={cellWidth * rayLengthFactor * horizontalRayLengthFactor} 
          height={cellWidth * rayWidthFactor} 
          fill= {colorMap[(color >> 6) & 7]}
          shadowColor={colorMap[(color >> 6) & 7]}
          shadowBlur={5}
          globalCompositeOperation='lighter'

        />
        <Rect 
          className = 'bottom'
          x = {cellWidth * (1 - rayWidthFactor) * 0.5}
          y = {cellWidth * (1 - rayLengthFactor * verticalRayLengthFactor)}
          width={cellWidth * rayWidthFactor} 
          height={cellWidth * rayLengthFactor * verticalRayLengthFactor} 
          fill= {colorMap[(color >> 3) & 7]}
          shadowColor={colorMap[(color >> 3) & 7]}
          shadowBlur={5}
          globalCompositeOperation='lighter'
        />
        <Rect 
          className = 'left'
          x = {0}
          y = {cellWidth * (1 - rayWidthFactor) * 0.5}
          width={cellWidth * rayLengthFactor * horizontalRayLengthFactor} 
          height={cellWidth * rayWidthFactor} 
          fill= {colorMap[(color) & 7]}
          shadowColor={colorMap[(color) & 7]}
          shadowBlur={5}
          globalCompositeOperation='lighter'
        />
      
    </Group>
  );
}

export default Cell;
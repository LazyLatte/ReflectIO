import {FC} from 'react';
import { Group, Rect } from 'react-konva';
import {colorMap, mirrorNormalVectorToDegree} from '../gameHelpers';
import {useStageConfig} from '../hooks';
import {ObjectType, CellRay} from '../interfaces';
interface DiagonalCellProps {
  cell: CellRay;
  i: number;
  j: number;
}
const inv_sqrt2 = 0.70710678118;
const DiagonalCell: FC<DiagonalCellProps> = ({cell, i, j}) => {
  const {color} = cell;
  const {cellWidth} = useStageConfig();
  const rayLengthFactor = 0.5;
  const rayWidthFactor = 0.1;
  
  const diagonalCellWidth = cellWidth * inv_sqrt2;

  let horizontalRayLengthFactor = 1;
  let verticalRayLengthFactor = 1;
  if(cell.object.type === ObjectType.Lens){
    const cutFactor = 0.15;
    const normalVector = cell.object.nv || {x: 0, y: 0};
    const deg = mirrorNormalVectorToDegree(normalVector);
    if(deg === 45 || deg === 225){
      verticalRayLengthFactor *= cutFactor;
    }else if(deg === 135 || deg === 315){
      horizontalRayLengthFactor *= cutFactor;
    }
  }
  
  return (
    <Group
      x={j*diagonalCellWidth} 
      y={i*diagonalCellWidth} 
      width={diagonalCellWidth} 
      height={diagonalCellWidth} 
    >
        <Rect 
          className = 'top'
          x = {diagonalCellWidth * (1 - rayWidthFactor) * 0.5}
          y = {0}
          width={diagonalCellWidth * rayWidthFactor} 
          height={diagonalCellWidth * rayLengthFactor * verticalRayLengthFactor} 
          fill= {colorMap[(color >> 9) & 7]}
          shadowColor={colorMap[(color >> 9) & 7]}
          shadowBlur={5}
          globalCompositeOperation='lighter'
        />

        <Rect 
          className = 'right'
          x = {diagonalCellWidth * (1 - rayLengthFactor * horizontalRayLengthFactor)}
          y = {diagonalCellWidth * (1 - rayWidthFactor) * 0.5}
          width={diagonalCellWidth * rayLengthFactor * horizontalRayLengthFactor} 
          height={diagonalCellWidth * rayWidthFactor} 
          fill= {colorMap[(color >> 6) & 7]}
          shadowColor={colorMap[(color >> 6) & 7]}
          shadowBlur={5}
          globalCompositeOperation='lighter'

        />
        <Rect 
          className = 'bottom'
          x = {diagonalCellWidth * (1 - rayWidthFactor) * 0.5}
          y = {diagonalCellWidth * (1 - rayLengthFactor * verticalRayLengthFactor)}
          width={diagonalCellWidth * rayWidthFactor} 
          height={diagonalCellWidth * rayLengthFactor * verticalRayLengthFactor} 
          fill= {colorMap[(color >> 3) & 7]}
          shadowColor={colorMap[(color >> 3) & 7]}
          shadowBlur={5}
          globalCompositeOperation='lighter'
        />
        <Rect 
          className = 'left'
          x = {0}
          y = {diagonalCellWidth * (1 - rayWidthFactor) * 0.5}
          width={diagonalCellWidth * rayLengthFactor * horizontalRayLengthFactor} 
          height={diagonalCellWidth * rayWidthFactor} 
          fill= {colorMap[(color) & 7]}
          shadowColor={colorMap[(color) & 7]}
          shadowBlur={5}
          globalCompositeOperation='lighter'
        />
      
    </Group>
  );
}

export default DiagonalCell;
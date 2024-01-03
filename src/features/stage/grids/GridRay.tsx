import {FC} from 'react';
import { Group} from 'react-konva';
import {CellRay, DiagonalCellRay} from './cells';
import {useStageConfig} from '../hooks';
import {Cell as CellInterface} from '../interfaces';
interface GridRayProps {
  grid: CellInterface[][];
  Dgrid: CellInterface[][];
}
const inv_sqrt2 = 0.70710678118;
const GridRay: FC<GridRayProps> = ({grid, Dgrid}) => {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const DgridHeight = Dgrid.length;
  const DgridWidth = Dgrid[0].length;

  const {cellWidth} = useStageConfig();
  return (
    <Group     
      clipX={0}
      clipY={0}
      clipWidth = {cellWidth * gridWidth}
      clipHeight = {cellWidth * gridWidth}
    >
      <Group>
        {grid.map((row, i) => (
          row.map((cell, j)=>(
            <CellRay cell={cell} i={i} j={j} key={i*Math.max(gridHeight, gridWidth)+j}/>
          ))
        ))}
      </Group>
      <Group 
        x={gridWidth * cellWidth * 0.5}
        y={gridHeight * cellWidth * 0.5} 
        offsetX = {DgridWidth * (inv_sqrt2) * cellWidth * 0.5}
        offsetY = {DgridHeight * (inv_sqrt2) * cellWidth * 0.5}
        rotation={45}
      >
          {Dgrid.map((row, i) => (
            row.map((cell, j)=>(
              <DiagonalCellRay cell={cell} i={i} j={j} key={i*Math.max(DgridHeight, DgridWidth)+j}/>
            ))
          ))}
      </Group>

  
    </Group>

  );
}

export default GridRay;

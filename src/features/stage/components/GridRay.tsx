import {FC} from 'react';
import { Group} from 'react-konva';
import Cell from './Cell';
import DiagonalCell from './DiagonalCell';
import {useStageConfig} from '../hooks';
import {CellRay} from '../interfaces';
interface GridRayProps {
  grid: CellRay[][];
  Dgrid: CellRay[][];
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
            <Cell cell={cell} i={i} j={j} key={i*Math.max(gridHeight, gridWidth)+j}/>
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
              <DiagonalCell cell={cell} i={i} j={j} key={i*Math.max(DgridHeight, DgridWidth)+j}/>
            ))
          ))}
      </Group>

  
    </Group>

  );
}

export default GridRay;

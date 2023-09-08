import {FC, memo} from 'react';
import { Group, Rect} from 'react-konva';
import {useStageConfig} from '../hooks';
import useColorMode from 'src/hooks/useColorMode';
interface GridProps {
  gridHeight: number;
  gridWidth: number;
}
const Grid: FC<GridProps> = memo(({gridHeight, gridWidth}) => {
  const gridArray: null[][] = Array(gridHeight).fill(Array(gridWidth).fill(null));
  const {cellWidth} = useStageConfig();
  const {colorMode} = useColorMode()!;
  //console.log('Grid');
  return (
    <Group>
        <Rect 
          width={gridWidth*cellWidth} 
          height={gridHeight*cellWidth} 
          fill={colorMode === 'dark' ? 'transparent' : 'DimGrey'}
          stroke={colorMode === 'dark' ? 'white' : 'black'}
          strokeWidth={2}
        />
        {gridArray.map((row, i)=>(
          row.map((_, j)=>(
              <Rect
                x={j*cellWidth} 
                y={i*cellWidth} 
                width={cellWidth} 
                height={cellWidth} 
                stroke={colorMode === 'dark' ? 'grey' : 'black'}
                strokeWidth = {1}
                key={i*Math.max(gridHeight, gridWidth)+j}
              />
          ))
        ))}
    </Group>
  );
})

export default Grid;
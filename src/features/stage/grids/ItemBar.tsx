import {FC, memo} from 'react';
import { Group, Rect} from 'react-konva';
import {useStageConfig} from '../hooks';
import useColorMode from 'src/hooks/useColorMode';
import {ITEMS_BAR_HEIGHT, ITEMS_BAR_WIDTH} from '../gameHelpers';
import {Vector2D} from '../interfaces';

interface ItemBarProps {
  gridHeight: number;
  gridWidth: number;
}

const ItemBar: FC<ItemBarProps> = memo(({gridHeight, gridWidth}) => {
  const {colorMode} = useColorMode()!;
  const {cellWidth, shouldRearrange} = useStageConfig();
  const itemBarPos: Vector2D = shouldRearrange ? {x: 0, y: gridHeight+1} : {x: gridWidth+1, y: 0};
  const itemBarShape: Size2D = shouldRearrange ? {height: ITEMS_BAR_WIDTH, width: ITEMS_BAR_HEIGHT} : {height: ITEMS_BAR_HEIGHT, width: ITEMS_BAR_WIDTH};
  const itemBarArray: null[][] = Array(itemBarShape.height).fill(Array(itemBarShape.width).fill(null));
  //console.log('ItemBar');
  return (
    <Group x={itemBarPos.x * cellWidth} y={itemBarPos.y * cellWidth}>
        <Rect 
          width={itemBarShape.width * cellWidth} 
          height={itemBarShape.height * cellWidth} 
          fill={colorMode === 'dark' ? 'transparent' : 'DimGrey'}
          stroke={colorMode === 'dark' ? 'white' : 'black'}
          strokeWidth={2}
        />
        {itemBarArray.map((row, i)=>(
          row.map((_, j)=>(
              <Rect
                x={j*cellWidth} 
                y={i*cellWidth} 
                width={cellWidth} 
                height={cellWidth} 
                stroke={colorMode === 'dark' ? 'grey' : 'black'}
                strokeWidth = {1}
                key={i*Math.max(itemBarShape.height, itemBarShape.width)+j}
              />
          ))
        ))}
    </Group>
  );
})

export default ItemBar;
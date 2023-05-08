import {FC, memo} from 'react';
import { Group, Rect} from 'react-konva';
import {useStageConfig} from '../hooks';
import {ITEMS_BAR_HEIGHT, ITEMS_BAR_WIDTH} from '../gameHelpers';
import {Vector2D, Size2D} from '../interfaces';

interface ItemBarProps {
  gridHeight: number;
  gridWidth: number;
}

const ItemBar: FC<ItemBarProps> = memo(({gridHeight, gridWidth}) => {
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
          stroke="white"
          strokeWidth={2}
        />
        {itemBarArray.map((row, i)=>(
          row.map((_, j)=>(
              <Rect
                x={j*cellWidth} 
                y={i*cellWidth} 
                width={cellWidth} 
                height={cellWidth} 
                stroke="grey"
                strokeWidth = {1}
                key={i*Math.max(itemBarShape.height, itemBarShape.width)+j}
              />
          ))
        ))}
    </Group>
  );
})

export default ItemBar;
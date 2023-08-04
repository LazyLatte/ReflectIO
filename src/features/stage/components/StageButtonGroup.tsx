import {FC, memo} from 'react';
import { Group } from 'react-konva';
import StageButton from './StageButton';
import {useStageConfig} from '../hooks';
import {ITEMS_BAR_HEIGHT} from '../gameHelpers';
import {Vector2D} from '../interfaces';
interface BTN {
  img:  HTMLImageElement | undefined;
  onClick: () => void;
}
interface StageButtonGroupProps{
  gridHeight: number;
  gridWidth: number;
  btn: BTN[];
}

const StageButtonGroup: FC<StageButtonGroupProps> = memo(({gridHeight, gridWidth, btn}) => {
  const {cellWidth, shouldRearrange} = useStageConfig();
  switch (btn.length){
    case 1: 
      let btnPos: Vector2D = shouldRearrange ? {x: ITEMS_BAR_HEIGHT+2.5, y: gridHeight+1.4} : {x: gridWidth+1.4, y: ITEMS_BAR_HEIGHT+2.5};
      return (
        <Group x={btnPos.x*cellWidth} y={btnPos.y*cellWidth}>
          <StageButton 
            image={btn[0].img} 
            position={{x: 0, y: 0}}
            onClick={btn[0].onClick}
          />
        </Group>
      );
    case 2 : 
      let btnGroupPos: Vector2D = shouldRearrange ? {x: ITEMS_BAR_HEIGHT+1.5, y: gridHeight+1.4} : {x: gridWidth+1.4, y: ITEMS_BAR_HEIGHT+1.5};
      return (
        <Group x={btnGroupPos.x*cellWidth} y={btnGroupPos.y*cellWidth}>
            <StageButton 
              image={btn[0].img} 
              position={{x: 0, y: 0}}
              onClick={btn[0].onClick}
            />
            <StageButton 
              image={btn[1].img} 
              position={shouldRearrange ? {x: cellWidth*2.2, y: 0} : {x: 0, y:cellWidth*2.2}}
              onClick={btn[1].onClick}
            />
        </Group>
      );
    default: return null;
  }
})

export default StageButtonGroup;

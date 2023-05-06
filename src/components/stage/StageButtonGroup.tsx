import {FC, memo} from 'react';
import { Group } from 'react-konva';
import StageButton from './StageButton';
import useStageConfig from '../../hooks/useStageConfig';
import {ITEMS_BAR_HEIGHT} from '../../gameHelpers';
import {Vector2D} from '../../Interfaces';
const btnWidthFactor = 1.2;
interface StageButtonGroupProps{
  gridHeight: number;
  gridWidth: number;
  btnImg1: HTMLImageElement | undefined;
  btnImg2: HTMLImageElement | undefined;
  onClick1: () => void;
  onClick2: () => void;
}

const StageButtonGroup: FC<StageButtonGroupProps> = memo(({gridHeight, gridWidth, btnImg1, btnImg2, onClick1, onClick2}) => {
  const {cellWidth, shouldRearrange} = useStageConfig();
  const btnGroupPos: Vector2D = shouldRearrange ? {x: ITEMS_BAR_HEIGHT+1.5, y: gridHeight+1.4} : {x: gridWidth+1.4, y: ITEMS_BAR_HEIGHT+1.5};
  return (
    <Group x={btnGroupPos.x*cellWidth} y={btnGroupPos.y*cellWidth}>
        <StageButton 
          image={btnImg1} 
          position={{x: 0, y: 0}}
          onClick={onClick1}
        />
        <StageButton 
          image={btnImg2} 
          position={shouldRearrange ? {x: cellWidth*(btnWidthFactor+1), y: 0} : {x: 0, y:cellWidth*(btnWidthFactor+1)}}
          onClick={onClick2}
        />
    </Group>
  );
})

export default StageButtonGroup;

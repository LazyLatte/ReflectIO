import {FC} from 'react';
import { Group } from 'react-konva';
import AnimatedStageButton from './AnimatedStageButton';
import {useStageConfig} from '../hooks';
import {ITEMS_BAR_HEIGHT} from '../gameHelpers';
interface AnimatedBTN {
  originalImage:  HTMLImageElement | undefined;
  aninmatedImage:  HTMLImageElement | undefined;
  animating: boolean;
  disabled: boolean;
  onClick: () => void;
}
interface AnimatedStageButtonGroupProps{
  gridHeight: number;
  gridWidth: number;
  animatedBTN: AnimatedBTN[];
}

const AnimatedStageButtonGroup: FC<AnimatedStageButtonGroupProps> = ({gridHeight, gridWidth, animatedBTN}) => {
  const {cellWidth, shouldRearrange} = useStageConfig();
  switch (animatedBTN.length){
    case 1: 
      let btnPos: Vector2D = shouldRearrange ? {x: ITEMS_BAR_HEIGHT+2.5, y: gridHeight+1.4} : {x: gridWidth+1.4, y: ITEMS_BAR_HEIGHT+2.5};
      return (
        <Group x={btnPos.x*cellWidth} y={btnPos.y*cellWidth}>
          <AnimatedStageButton 
            originalImage={animatedBTN[0].originalImage} 
            aninmatedImage={animatedBTN[0].aninmatedImage}
            animating={animatedBTN[0].animating}
            disabled={animatedBTN[0].disabled}
            position={{x: 0, y: 0}}
            onClick={animatedBTN[0].onClick}
          />
        </Group>
      );
    case 2 : 
      let btnGroupPos: Vector2D = shouldRearrange ? {x: ITEMS_BAR_HEIGHT + (0.5 * gridWidth - 3.5), y: gridHeight+1.4} : {x: gridWidth+1.4, y: ITEMS_BAR_HEIGHT + (0.5 * gridHeight - 3.5)};
      return (
        <Group x={btnGroupPos.x*cellWidth} y={btnGroupPos.y*cellWidth}>
          <AnimatedStageButton 
            originalImage={animatedBTN[0].originalImage} 
            aninmatedImage={animatedBTN[0].aninmatedImage}
            animating={animatedBTN[0].animating}
            disabled={animatedBTN[0].disabled}
            position={{x: 0, y: 0}}
            onClick={animatedBTN[0].onClick}
          />
          <AnimatedStageButton 
            originalImage={animatedBTN[1].originalImage} 
            aninmatedImage={animatedBTN[1].aninmatedImage}
            animating={animatedBTN[1].animating}
            disabled={animatedBTN[1].disabled}
            position={shouldRearrange ? {x: cellWidth* (0.1 * gridWidth + 1.2), y: 0} : {x: 0, y:cellWidth * (0.1 * gridHeight + 1.2)}}
            onClick={animatedBTN[1].onClick}
          />
        </Group>
      );
    default: return null;
  }
}

export default AnimatedStageButtonGroup;

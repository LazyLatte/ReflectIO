import {FC} from 'react';
import { Group, Label, Tag, Text, Circle} from 'react-konva';
import {useStageConfig} from '../hooks';
import {Target} from '../interfaces';
import {colorMap} from '../gameHelpers';
interface ColorMixingPopoverProps {target: Target | null, isGettingThumbnail: boolean}
const ColorMixingPopover: FC<ColorMixingPopoverProps> = ({target, isGettingThumbnail}) => {
  if(!target || isGettingThumbnail) return null;
  const {cellWidth} = useStageConfig();
  const {pos: targetPos, color} = target;
  const symbolSize = 30;
  const fontSize = 45;
  const circleRadius = 15;
  
  const rgb: (number | string)[] = [];
  const b = color & 1;
  const g = color & 2;
  const r = color & 4;
  if(b){rgb.push(1); rgb.push('+');}
  if(g){rgb.push(2); rgb.push('+');}
  if(r){rgb.push(4); rgb.push('+');};
  rgb.pop();
  const popoverWidth = rgb.length * symbolSize;
  const popoverHeight = symbolSize;
  return (
    <Group
      x={targetPos.x * cellWidth}
      y={targetPos.y * cellWidth}
    >
      <Label x={0.5 * cellWidth} y={0}>
        <Tag
          fill={'white'}
          stroke='black' 
          cornerRadius={10}
          pointerDirection={'down'}
          pointerWidth={10}
          pointerHeight={10}
          shadowColor={'black'}
          shadowBlur={5}
          shadowOffset={{x: 5, y: 5}}
          shadowOpacity={0.5}   
                                         
        />    

        <Text
          text={`0${rgb.join('')}0`}
          fontSize={fontSize}
          visible={false}
        />  

      </Label>
      <Group
        x={(cellWidth - popoverWidth) * 0.5}
        y={-(popoverHeight + 10 + (fontSize - symbolSize)*0.5)}
      >

        {rgb.map((c, i)=>(
          <Group
            x={i * symbolSize}
            y={0}
            key={i}
          >

            {typeof c === 'number' ?
              <Circle
                x={symbolSize * 0.5}
                y={symbolSize * 0.5}
                radius={circleRadius}
                fill={colorMap[c]}
                stroke='black'
              /> 
              :
              <Text
                x={2.5}
                y={-3.75}
                text={c}
                fontSize={fontSize}
              /> 
            }
          </Group>
         ))}
      </Group>
    </Group>
  )

} 

export default ColorMixingPopover;
import {FC} from 'react';
import { Group, Rect, Image} from 'react-konva';
interface OptionCellProps {
  idx: number;
  image: HTMLImageElement | undefined;
  onClick: () => void;
}
const OptionCell: FC<OptionCellProps> = ({idx, image, onClick}) => {
  const optionCellWidth = 60;
  return (
      <Group 
        x={0} 
        y={idx * optionCellWidth} 
        onMouseEnter={e => {
          const container = e.target.getStage()?.container();
          container && (container.style.cursor = "pointer");
        }}
        onMouseLeave={e => {
          const container = e.target.getStage()?.container();
          container && (container.style.cursor = "default");
        }}
        onClick={onClick}
      >
        <Rect
          height={optionCellWidth} 
          width={optionCellWidth}
          fill='#202234'
          stroke='#F5FFFA'
        />
        <Image image={image} width={optionCellWidth} height={optionCellWidth}/>
      </Group> 
  );
};

export default OptionCell;
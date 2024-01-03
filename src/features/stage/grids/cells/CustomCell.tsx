import {FC, useState} from 'react';
import {Group, Rect, Image} from 'react-konva';
import {useStageConfig} from '../../hooks';
interface CustomCellProps {
  i: number;
  j: number;
  image?: HTMLImageElement;
  dropdownCellPos: Vector2D | null;
  onClick: () => void;
}
const CustomCell: FC<CustomCellProps> = ({i, j, image, dropdownCellPos, onClick}) => {
    const [onHover, setOnHover] = useState<boolean>(false);
    const cellIsClicked = dropdownCellPos ? dropdownCellPos.x === j && dropdownCellPos.y === i: false;
    const {cellWidth} = useStageConfig();
    return (
      <Group
        x={j*cellWidth}
        y={i*cellWidth}
        width={cellWidth} 
        height={cellWidth} 
      >
        {image && 
          <Image
            image={image} 
            x={cellWidth * 0.2}
            y={cellWidth * 0.2}
            width={cellWidth * 0.6}
            height={cellWidth * 0.6}
            opacity={0.9}
          />
        }
        <Rect
          width={cellWidth} 
          height={cellWidth} 
          fill= {onHover || cellIsClicked ? 'rgba(255, 255, 255, 0.5)':'transparent'}
    
          onMouseEnter={e => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = "pointer");
            setOnHover(true);
          }}
          onMouseLeave={e => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = "default");
            setOnHover(false);
          }}
          onClick={onClick}
          
        />
      </Group>
    )
  }

export default CustomCell;
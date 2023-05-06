import {FC, useState} from 'react';
import {Rect} from 'react-konva';
import useStageConfig from '../../hooks/useStageConfig';
import {Vector2D} from '../../Interfaces';
interface CustomCellProps {
  i: number;
  j: number;
  dropdownCellPos: Vector2D | null;
  onClick: () => void;
}
const CustomCell: FC<CustomCellProps> = ({i, j, dropdownCellPos, onClick}) => {
    const [onHover, setOnHover] = useState<boolean>(false);
    const cellIsClicked = dropdownCellPos ? dropdownCellPos.x === j && dropdownCellPos.y === i: false;
    const {cellWidth} = useStageConfig();
    return (
      <Rect
        x={j*cellWidth} 
        y={i*cellWidth} 
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
    )
  }

export default CustomCell;
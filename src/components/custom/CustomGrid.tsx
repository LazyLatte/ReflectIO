import {FC, Dispatch, SetStateAction} from 'react';
import { Group} from 'react-konva';
import CustomCell from './CustomCell';
import { Vector2D, CustomizationTools } from '../../Interfaces';

interface CustomGridProps {
  gridHeight: number;
  gridWidth: number;
  dropdownCellPos: Vector2D | null;
  setDropdownCellPos: Dispatch<SetStateAction<Vector2D | null>>;
  customizationTools: CustomizationTools;
}

const CustomGrid: FC<CustomGridProps> = ({gridHeight, gridWidth, dropdownCellPos, setDropdownCellPos, customizationTools}) => {
  if(!customizationTools) return null;
  const gridArray: null[][] = Array(gridHeight).fill(Array(gridWidth).fill(null));
  return (
    <Group>
        {gridArray.map((row, i)=>(
          row.map((_, j)=>(
            <CustomCell 
              i={i} 
              j={j} 
              dropdownCellPos={dropdownCellPos} 
              onClick={()=>{
                setDropdownCellPos(prev => prev ? null : {x: j, y: i} )
              }}
              key={i*Math.max(gridHeight, gridWidth)+j} 
            />
          ))
        ))}
    </Group>

  );
}

export default CustomGrid;
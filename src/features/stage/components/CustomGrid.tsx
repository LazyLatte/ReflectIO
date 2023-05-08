import {FC, Dispatch, SetStateAction} from 'react';
import { Group} from 'react-konva';
import CustomCell from './CustomCell';
import { Vector2D, Mode } from '../interfaces';

interface CustomGridProps {
  mode: Mode;
  gridHeight: number;
  gridWidth: number;
  dropdownCellPos: Vector2D | null;
  setDropdownCellPos: Dispatch<SetStateAction<Vector2D | null>>;
}

const CustomGrid: FC<CustomGridProps> = ({mode, gridHeight, gridWidth, dropdownCellPos, setDropdownCellPos}) => {
  if(mode !== Mode.Custom) return null;
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
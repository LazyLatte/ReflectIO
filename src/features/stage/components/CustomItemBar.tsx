import {FC, Dispatch, SetStateAction} from 'react'
import { Group } from 'react-konva';
import useImage from 'use-image';
import { Mode, ITEMS_BAR_HEIGHT, ITEMS_BAR_WIDTH, Vector2D, useStageConfig } from '..';
import CustomCell from './CustomCell';
import Plus from '@images/icons/add-object.svg'
interface CustomItemBarProps {
    mode: Mode;
    gridHeight: number;
    gridWidth: number;
    mirrorNum: number;
    dropdownCellPos: Vector2D | null;
    setDropdownCellPos: Dispatch<SetStateAction<Vector2D | null>>;
}
const CustomItemBar: FC<CustomItemBarProps> = ({mode, gridHeight, gridWidth, mirrorNum, dropdownCellPos, setDropdownCellPos}) => {
    if(mode !== Mode.Custom) return null;
    const {shouldRearrange} = useStageConfig();
    const offset: Vector2D = shouldRearrange ? {x: 0, y: gridHeight + 1} : {x: gridWidth + 1, y: 0};
    const barShape: Size2D = shouldRearrange ? {height: ITEMS_BAR_WIDTH, width: ITEMS_BAR_HEIGHT} : {height: ITEMS_BAR_HEIGHT, width: ITEMS_BAR_WIDTH};
    const barArray: null[][] = Array(barShape.height).fill(Array(barShape.width).fill(null));
    const [plusImg] = useImage(Plus);
    return (
      <Group>
          {barArray.map((row, i)=>(
            row.map((_, j)=> {
                const hasMirror = (shouldRearrange ? (i*barShape.width + j) : (j*barShape.height + i)) < mirrorNum;
                if(hasMirror){
                    return null;
                }else{
                    return (
                        <CustomCell 
                            i={i + offset.y} 
                            j={j + offset.x} 
                            image={plusImg}
                            dropdownCellPos={dropdownCellPos} 
                            onClick={()=>{
                                setDropdownCellPos(prev => prev ? null : {x: j + offset.x, y: i + offset.y} )
                            }}
                            key={i*Math.max(ITEMS_BAR_HEIGHT, ITEMS_BAR_WIDTH)+j} 
                        />
                    )
                }
            })
          ))}
      </Group>
  
    );
}

export default CustomItemBar
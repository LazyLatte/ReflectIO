import { FC, Dispatch, SetStateAction, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import ObjectAlternativesDropdown from './ObjectAlternativesDropdown';
import {useStageConfig} from '../hooks';
import { Mode, Vector2D, AddObjects} from '../interfaces';
interface AddObjectDropdownProps {
  mode: Mode;
  dropdownCellPos: Vector2D | null;
  setDropdownCellPos: Dispatch<SetStateAction<Vector2D | null>>;
  addObjects: AddObjects;
}
interface colorDropdownInterface {
  pos: Vector2D;
  objType: 'Laser' | 'Target' | 'Mirror';
}
const AddObjectDropdown: FC<AddObjectDropdownProps> = ({mode, dropdownCellPos, setDropdownCellPos, addObjects}) => {
  if(!dropdownCellPos || mode !== Mode.Custom) return null;
  
  const cellPos = dropdownCellPos;
  const objectOptions: ['Laser', 'Target', 'Mirror'] = ['Laser', 'Target', 'Mirror'];
  const objectOptionSize: Size2D = { height: 50, width: 120 };
  const [colorDropdown, setColorDropdown] = useState<colorDropdownInterface | null>(null);
  const closeDropdown = () =>{
    setDropdownCellPos(null);
    setColorDropdown(null);
  }
  const {cellWidth} = useStageConfig();
  return (
    <Group x={(cellPos.x + 1.2) * cellWidth} y={cellPos.y * cellWidth}>
      {objectOptions.map((objType, i) => (
        <Group 
          x={0} 
          y={i * objectOptionSize.height} 
          key={i}
          onMouseEnter={e => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = "pointer");
          }}
          onMouseLeave={e => {
            const container = e.target.getStage()?.container();
            container && (container.style.cursor = "default");
          }}
        >
          <Rect
            width={objectOptionSize.width}
            height={objectOptionSize.height}
            fill='#202234'
            stroke='#F5FFFA'
          />
          <Text
            width={objectOptionSize.width}
            height={objectOptionSize.height}
            text={objType}
            align="center"
            verticalAlign="middle"
            fill='white'
            fontSize={30}
            onmouseover={() => setColorDropdown({
                pos: {
                  x: objectOptionSize.width + 2,
                  y: -10 + i * objectOptionSize.height
                },
                objType
            })}
            
          />
        </Group>
      ))}

      {colorDropdown && 
        <ObjectAlternativesDropdown 
          cellPos={cellPos}
          origin={colorDropdown.pos}  
          objType={colorDropdown.objType} 
          addObjects={addObjects} 
          closeDropdown={closeDropdown} 
        />
      }
    </Group>
  );
};

export default AddObjectDropdown;
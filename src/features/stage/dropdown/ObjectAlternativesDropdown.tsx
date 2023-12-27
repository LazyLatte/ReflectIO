import {FC} from 'react';
import { Group} from 'react-konva';
import OptionCell from './OptionCell';
import {useStageConfig, useImages} from '../hooks';
import { ObjectType, AddObjects } from '../interfaces';
interface ObjectAlternativesDropdownProps {
  origin: Vector2D;
  cellPos: Vector2D;
  objType: 'Laser' | 'Target' | 'Reflect' | 'Lens';
  addObjects: AddObjects;
  closeDropdown: () => void;
}

const ObjectColorOptions = {
  "Laser": [4, 2, 1, 6, 3, 5, 7] as const,
  "Target": [4, 2, 1, 6, 3, 5, 7] as const,
  "Reflect": [7, 4, 2, 1, 6, 3, 5] as const,
  "Lens": [7, 4, 2, 1, 6, 3, 5] as const
}
const ObjectAlternativesDropdown: FC<ObjectAlternativesDropdownProps> = ({ origin, cellPos, objType, addObjects, closeDropdown}) => {
  const {addLaser, addTarget, addMirror} = addObjects;
  const colorOptions = ObjectColorOptions[objType];
  
  const laserImages = useImages()?.laserImages || [];
  const targetImages = useImages()?.targetImages || [];
  const reflectorImages = useImages()?.reflectorImages || [];
  const lensImages = useImages()?.lensImages || [];

  const {shouldRearrange} = useStageConfig();
  return (
    <Group x={origin.x} y={origin.y} >
      {objType === 'Laser' &&
        <Group>
          {colorOptions.map((color, i)=>(
            <OptionCell 
              key={i}
              idx={i}
              image={laserImages[color]} 
              onClick={()=>{
                addLaser(cellPos, color);
                closeDropdown();
              }}
            />
          ))}
        </Group>
      }
      {objType === 'Target' &&
        <Group>
          {colorOptions.map((color, i)=>(
            <OptionCell 
              key={i}
              idx={i}
              image={targetImages[color][1]} 
              onClick={()=>{
                addTarget(cellPos, color);
                closeDropdown();
              }}
            />
          ))}
        </Group>
      }

      {objType === 'Reflect' &&
        <Group>
          {colorOptions.map((color, i)=>(
            <OptionCell 
              key={i}
              idx={i}
              image={reflectorImages[color]} 
              onClick={()=>{
                addMirror(ObjectType.Reflector, cellPos, color, shouldRearrange);
                closeDropdown();
              }}
            />
          ))}
        </Group>
      }

      {objType === 'Lens' &&
        <Group>
          {colorOptions.map((color, i)=>(
            <OptionCell 
              key={i}
              idx={i}
              image={lensImages[color]} 
              onClick={()=>{
                addMirror(ObjectType.Lens, cellPos, color, shouldRearrange);
                closeDropdown();
              }}
            />
          ))}
        </Group>
      }
    </Group>
  );
};

export default ObjectAlternativesDropdown;
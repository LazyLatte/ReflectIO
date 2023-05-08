import {FC} from 'react';
import { Group} from 'react-konva';
import OptionCell from './OptionCell';
import {useStageConfig, useImages} from '../hooks';
import { ObjectType, Vector2D, AddObjects } from '../interfaces';
interface ObjectAlternativesDropdownProps {
  origin: Vector2D;
  cellPos: Vector2D;
  objType: 'Laser' | 'Target' | 'Mirror';
  addObjects: AddObjects;
  closeDropdown: () => void;
}

const ObjectAlternativesDropdown: FC<ObjectAlternativesDropdownProps> = ({ origin, cellPos, objType, addObjects, closeDropdown}) => {
  const {addLaser, addTarget, addMirror} = addObjects;
  const colorOptions = [4, 2, 1, 6, 3, 5, 7] as const;
  const mirrorOptions = [ObjectType.Reflector, ObjectType.Lens] as const;

  const laserImages = useImages()?.laserImages || [];
  const targetImages = useImages()?.targetImages || [];
  const mirrorImages = useImages()?.mirrorImages || [];
  
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

      {objType === 'Mirror' &&
        <Group>
          {mirrorOptions.map((type, i)=>(
            <OptionCell 
              key={i}
              idx={i}
              image={mirrorImages[i]} 
              onClick={()=>{
                addMirror(type, cellPos, shouldRearrange);
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
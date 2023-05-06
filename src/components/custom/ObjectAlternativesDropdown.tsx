import {FC} from 'react';
import { Group} from 'react-konva';
import OptionCell from './OptionCell';
import useImages from '../../hooks/useImages';
import useStageConfig from '../../hooks/useStageConfig';
import {ObjectType} from '../../Enums';
import { Vector2D, CustomizationTools } from '../../Interfaces';
interface ObjectAlternativesDropdownProps {
  origin: Vector2D;
  cellPos: Vector2D;
  objType: 'Laser' | 'Target' | 'Mirror';
  customizationTools: CustomizationTools;
  closeDropdown: () => void;
}

const ObjectAlternativesDropdown: FC<ObjectAlternativesDropdownProps> = ({ origin, cellPos, objType, customizationTools, closeDropdown}) => {
  const colorOptions = [4, 2, 1, 6, 3, 5, 7];
  const mirrorOptions = [ObjectType.Reflector, ObjectType.Lens];

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
                customizationTools?.addLaser(cellPos, color);
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
                customizationTools?.addTarget(cellPos, color);
                closeDropdown();
              }}
            />
          ))}
        </Group>
      }

      {objType === 'Mirror' &&
        <Group>
          {mirrorOptions.map((_, i)=>(
            <OptionCell 
              key={i}
              idx={i}
              image={mirrorImages[i]} 
              onClick={()=>{
                i === 0 ? customizationTools?.addReflector(cellPos, shouldRearrange) : customizationTools?.addLens(cellPos, shouldRearrange);
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
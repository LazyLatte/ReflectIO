import {FC, memo} from 'react';
import { Group, Image, Rect } from 'react-konva';
import {useStageConfig} from '../hooks';
import useColorMode from 'src/hooks/useColorMode';
interface StageButtonProps {
  image: HTMLImageElement | undefined;
  position: Vector2D;
  onClick: () => void;
}

const btnWidthFactor = 1.2;
const StageButton: FC<StageButtonProps> = memo(({image, position, onClick}) => {
  const {colorMode} = useColorMode()!;
  const {cellWidth} = useStageConfig();
  return (
    <Group
      position={position}
      onMouseEnter={e => {
        const container = e.target.getStage()?.container();
        container && (container.style.cursor = "pointer");
      }}
      onMouseLeave={e => {
        const container = e.target.getStage()?.container();
        container && (container.style.cursor = "default");
      }}
      onclick={onClick}
    >
      <Rect
        cornerRadius = {20}
        width={cellWidth*btnWidthFactor} 
        height={cellWidth*btnWidthFactor} 
        fill={colorMode === 'dark' ? 'rgb(239,83,55)' : "rgb(255,115,87)"}
        stroke={colorMode === 'dark' ? "rgb(255,115,87)" : 'rgb(239,83,55)'}
      />
      <Image
        image={image}
        x={(btnWidthFactor - 1) * 0.5 * cellWidth}
        y={(btnWidthFactor - 1) * 0.5 * cellWidth}
        width={cellWidth} 
        height={cellWidth} 
      />
    </Group>
  )
})

export default StageButton;
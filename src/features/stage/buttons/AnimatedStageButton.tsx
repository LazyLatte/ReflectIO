import {FC, useEffect, createRef} from 'react';
import { Group, Image, Rect } from 'react-konva';
import Konva from "konva";
import {useStageConfig} from '../hooks';
import useColorMode from 'src/hooks/useColorMode';
interface AnimatedStageButtonProps{
  originalImage: HTMLImageElement | undefined;
  aninmatedImage: HTMLImageElement | undefined;
  animating: boolean;
  disabled: boolean;
  position: Vector2D;
  onClick: () => void;
}
const btnWidthFactor = 1.2;
const AnimatedStageButton: FC<AnimatedStageButtonProps> = ({originalImage, aninmatedImage, animating, disabled, position, onClick}) => {
  const {colorMode} = useColorMode()!;
  const {cellWidth} = useStageConfig();
  const imgRef = createRef<Konva.Image>()

  useEffect(() => {
    const node = imgRef.current;
    const anim = new Konva.Animation(
      (frame) => {
        node?.rotate(8);
      },
      []
    );

    if (animating) {
      anim.start();
    }else{
      anim.stop();
      node?.rotation(0);
    }

    return () => {
      anim.stop();
    };
  }, [animating]);
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
        fill={disabled ? '#A9A9A9' : (colorMode === 'dark' ? 'rgb(239,83,55)' : "rgb(255,115,87)")}
        stroke={colorMode === 'dark' ? "rgb(255,115,87)" : 'rgb(239,83,55)'}
      />
      <Image
        ref={imgRef}
        image={animating ? aninmatedImage : originalImage}
        offsetX={ 0.5 * cellWidth}
        offsetY={ 0.5 * cellWidth}
        x={0.6 * cellWidth}
        y={0.6 * cellWidth}
        width={cellWidth} 
        height={cellWidth} 
      />
    </Group>
  )
}

export default AnimatedStageButton;

import {useImperativeHandle, forwardRef, createRef} from 'react';
import {Stage as Wrap, Layer, Rect} from 'react-konva';
import Konva from 'konva';



interface EmptyStageProps {
  size: number;
  cellWidth: number;
}
export interface EmptyStageHandle {
    getThumbnail: () => string | undefined;
}
export const EmptyStage = forwardRef<EmptyStageHandle, EmptyStageProps>(({size, cellWidth}, ref) => {
    const stageRef = createRef<Konva.Stage>();
    const gridArray: null[][] = Array(size).fill(Array(size).fill(null));
    useImperativeHandle(ref, () => ({
        getThumbnail: () => {
            return stageRef.current?.toDataURL({
                x: 0,
                y: 0,
                width: size * cellWidth + 2,
                height: size * cellWidth + 2,
                pixelRatio: 200.0 / (size * cellWidth),
            });
        }
    }))
    return (
        <Wrap width={size * cellWidth} height={size * cellWidth} ref={stageRef}>
            <Layer x={0} y={0}>
                <Rect 
                    width={size*cellWidth} 
                    height={size*cellWidth} 
                    stroke="black"
                    strokeWidth={3}
                />
                {gridArray.map((row, i)=>(
                    row.map((_, j)=>(
                        <Rect
                            x={j*cellWidth} 
                            y={i*cellWidth} 
                            width={cellWidth} 
                            height={cellWidth} 
                            stroke="grey"
                            strokeWidth = {1}
                            key={i*size+j}
                        />
                    ))
                ))}
            </Layer>
        </Wrap>
    );
})



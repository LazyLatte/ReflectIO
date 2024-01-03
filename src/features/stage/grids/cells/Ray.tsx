import {FC} from 'react';
import { Group, Shape } from 'react-konva';
import {colorMap, mirrorDirectionToDegree} from '../../gameHelpers';
import {useStageConfig} from '../../hooks';
import {ObjectType, CellObject} from '../../interfaces';
import useColorMode from 'src/hooks/useColorMode';

export enum Position {Top, Right, Bottom, Left};
enum RayShape {Rectangle, Rectangle_Penertated, Rectangle_Absorbed, Rectangle_Block, Rectangle_Diagonal_Block, Trapezoid, Trapezoid_Symmetry}
interface RayProps {
    color: Color;
    object: CellObject;
    position: Position;
    diagonal?: boolean;
}
const inv_sqrt2 = 0.70710678118;
const degs = [0, 90, 180, 270] as const;
const RayLengthFactorPairs = [
    [0.5, 0.5], [0.55, 0.55], [0.45, 0.45], [0.175, 0.175], [0.075, 0.075], [0.45, 0.375], [0.375, 0.45]
] as const;

const Shapes = [
    [[RayShape.Rectangle_Block, RayShape.Rectangle_Block], [RayShape.Rectangle_Absorbed, RayShape.Rectangle_Penertated], [RayShape.Rectangle_Block, RayShape.Rectangle_Block], [RayShape.Rectangle_Absorbed, RayShape.Rectangle_Penertated]], //0deg
    [[RayShape.Trapezoid, RayShape.Rectangle], [RayShape.Trapezoid_Symmetry, RayShape.Rectangle], [RayShape.Trapezoid, RayShape.Rectangle], [RayShape.Trapezoid_Symmetry, RayShape.Rectangle]], //45deg
    [[RayShape.Rectangle_Absorbed, RayShape.Rectangle_Penertated], [RayShape.Rectangle_Block, RayShape.Rectangle_Block], [RayShape.Rectangle_Absorbed, RayShape.Rectangle_Penertated], [RayShape.Rectangle_Block, RayShape.Rectangle_Block]], //90deg
    [[RayShape.Trapezoid_Symmetry, RayShape.Rectangle], [RayShape.Trapezoid, RayShape.Rectangle], [RayShape.Trapezoid_Symmetry, RayShape.Rectangle], [RayShape.Trapezoid, RayShape.Rectangle]] //135deg
] as const; //[deg][Position][color & raycolor]

const DiagonalShapes = [
  [[RayShape.Trapezoid_Symmetry, RayShape.Rectangle], [RayShape.Trapezoid, RayShape.Rectangle], [RayShape.Trapezoid_Symmetry, RayShape.Rectangle], [RayShape.Trapezoid, RayShape.Rectangle]], //135deg
  [[RayShape.Rectangle_Diagonal_Block, RayShape.Rectangle_Diagonal_Block], [RayShape.Rectangle_Absorbed, RayShape.Rectangle_Penertated], [RayShape.Rectangle_Diagonal_Block, RayShape.Rectangle_Diagonal_Block], [RayShape.Rectangle_Absorbed, RayShape.Rectangle_Penertated]], //90deg
  [[RayShape.Trapezoid, RayShape.Rectangle], [RayShape.Trapezoid_Symmetry, RayShape.Rectangle], [RayShape.Trapezoid, RayShape.Rectangle], [RayShape.Trapezoid_Symmetry, RayShape.Rectangle]], //45deg
  [[RayShape.Rectangle_Absorbed, RayShape.Rectangle_Penertated], [RayShape.Rectangle_Diagonal_Block, RayShape.Rectangle_Diagonal_Block], [RayShape.Rectangle_Absorbed, RayShape.Rectangle_Penertated], [RayShape.Rectangle_Diagonal_Block, RayShape.Rectangle_Diagonal_Block]], //0deg
] as const; //[deg][Position][color & raycolor]

const getRayShape = (object: CellObject, rayColor: Color, rayPosition: Position, diagonal: boolean | undefined) => {
    const {type, dir, color} = object;
    const isPenetrated = (color & rayColor) ? 1 : 0;
    if(type === ObjectType.Lens){
        const deg = mirrorDirectionToDegree(dir);
        if(diagonal){
          switch(deg){
            case 0:
            case 180:
                return DiagonalShapes[0][rayPosition][isPenetrated];
            case 45:
            case 225:
                return DiagonalShapes[1][rayPosition][isPenetrated];
            case 90:
            case 270:
                return DiagonalShapes[2][rayPosition][isPenetrated];
            case 135:
            case 315:
                return DiagonalShapes[3][rayPosition][isPenetrated];
          }
        }else{
          switch(deg){
            case 0:
            case 180:
                return Shapes[0][rayPosition][isPenetrated];
            case 45:
            case 225:
                return Shapes[1][rayPosition][isPenetrated];
            case 90:
            case 270:
                return Shapes[2][rayPosition][isPenetrated];
            case 135:
            case 315:
                return Shapes[3][rayPosition][isPenetrated];
          }
        }
    }else{
        return RayShape.Rectangle;
    }
}

const Ray: FC<RayProps> = ({color, object, position, diagonal}) => {
    const {colorMode} = useColorMode()!;
    const cellWidth = useStageConfig().cellWidth * (diagonal ? inv_sqrt2 : 1);
    const rayWidthFactor = 0.1 * (diagonal ? 1 : inv_sqrt2);
    const colorDecompose: Color[] = [];
    (color & 4) && colorDecompose.push(4);
    (color & 2) && colorDecompose.push(2);
    (color & 1) && colorDecompose.push(1);
  
    const rgbLayers: Color[] = [];
    colorDecompose.forEach(rgb => {
      if(rgb & object.color){
        rgbLayers.unshift(rgb);
      }else{
        rgbLayers.push(rgb);
      }
    })
    
    return (
      <Group>
        {rgbLayers.map((rgb, i) => {
          const rayLengthFactorPair = RayLengthFactorPairs[getRayShape(object, rgb, position, diagonal)];
          return (
            <Shape
              sceneFunc={(context, shape) => {
                context.beginPath();
                context.moveTo(cellWidth * (1 - rayWidthFactor) * 0.5, cellWidth * rayLengthFactorPair[0]);
                context.lineTo(cellWidth * (1 - rayWidthFactor) * 0.5, 0);
                context.lineTo(cellWidth * (1 - rayWidthFactor) * 0.5 + cellWidth * rayWidthFactor, 0);
                context.lineTo(cellWidth * (1 - rayWidthFactor) * 0.5 + cellWidth * rayWidthFactor, cellWidth * rayLengthFactorPair[1]);
                context.closePath();
                context.fillStrokeShape(shape);
              }}
              fill={colorMap[rgb]}
              shadowColor={colorMap[rgb]}
              shadowBlur={colorMode === 'dark' ? 5 : 0}
              globalCompositeOperation='lighter'
              offsetX={cellWidth * 0.5}
              offsetY={cellWidth * 0.5}
              x={cellWidth * 0.5}
              y={cellWidth * 0.5}
              rotation={degs[position]} 
              key={i}
            />
          )
        })}
      </Group>
    )
  }

export default Ray;
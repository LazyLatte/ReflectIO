import {useState, useEffect, useLayoutEffect, ReactNode, forwardRef, useImperativeHandle, createRef} from 'react';
import {Stage as Wrap, Layer} from 'react-konva';
import Konva from 'konva';
import {Lasers, Targets, Mirrors} from './objects';
import {Grid, CustomGrid, GridRay, ItemBar, CustomItemBar} from './grids';
import {ColorMixingPopover, TutorialHint} from './hints';
import {AddObjectDropdown} from './dropdown';
import {useGridRay, useStageConfig} from './hooks';
import {ObjectType, Level, Target, Mode, TutorialGoal} from './interfaces';
import DownloadButton from './buttons/DownloadButton';
import { state2info } from '@features/level/custom-level/utils';
interface StageProps {
  mode: Mode;
  level: Level;
  tutorialGoal?: TutorialGoal;
  isGettingThumbnail?: boolean;
  onClear: () => void;
  children?: ReactNode;
}
export interface StageHandle {
  getThumbnail: () => string | undefined;
}
export const Stage = forwardRef<StageHandle, StageProps>(({mode, level, tutorialGoal, isGettingThumbnail, onClear, children}, ref) => {
  const layerRef = createRef<Konva.Layer>()
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;
  const {height: gridHeight, width: gridWidth, lasers, targets, reflectors, lenses} = levelState;
  
  const {cellWidth, shouldRearrange} = useStageConfig();
  const gridRay = useGridRay(gridHeight, gridWidth, lasers, reflectors, lenses, targets, targetActions.setTargetClear);
  
  const boardOrigin: Vector2D = {x: (window.innerWidth-gridWidth*cellWidth) * 0.5, y: 56};

  const isOnBoard = (pos: Vector2D) => (pos.x >= 0 && pos.x < gridWidth && pos.y >= 0 && pos.y < gridHeight);
  const isEmptyCell = (pos: Vector2D): boolean => (gridRay.grid[pos.y][pos.x].object.type === ObjectType.None);
  const isValidCell = (pos: Vector2D): boolean => isOnBoard(pos) && isEmptyCell(pos);
  const isDraggable = (pos: Vector2D): boolean => (mode !== Mode.Tutorial || (mode===Mode.Tutorial && pos.x === tutorialGoal?.fromPos.x && pos.y === tutorialGoal?.fromPos.y && tutorialGoal?.match === "pos"))
  const isDisabled = (pos: Vector2D): boolean => (mode===Mode.Tutorial && (pos.x !== tutorialGoal?.fromPos.x || pos.y !== tutorialGoal?.fromPos.y || tutorialGoal?.match !== "deg"));

  useLayoutEffect(()=>{
    mirrorActions.updateMirrorsResetPos(shouldRearrange);
  }, [shouldRearrange]);
  useEffect(()=>{
    let isClear = targets.length > 0;
    targets.forEach(target => {
      isClear &&= Boolean(target.clear);
    });
    isClear && onClear();
    setLevelClear(isClear);
  }, [gridRay])

  useImperativeHandle(ref, ()=>({
    getThumbnail: () => {
      return layerRef.current?.toDataURL({
        x: boardOrigin.x-2,
        y: boardOrigin.y-2,
        width: gridWidth * cellWidth + 4,
        height: gridHeight * cellWidth + 4,
        pixelRatio: 200.0 / (gridWidth * cellWidth),
      });
    }
  }))

  const [mouseOnTarget, setMouseOnTarget] = useState<Target | null>(null);
  const [dropdownCellPos, setDropdownCellPos] = useState<Vector2D | null>(null);
  return (
      <div 
        style={{position: 'absolute'}}
        onContextMenu={e => e.preventDefault()}
      >
        <Wrap width={window.innerWidth} height={window.innerHeight - 100} >
          <Layer x={boardOrigin.x} y={boardOrigin.y}>
            <ItemBar gridHeight={gridHeight} gridWidth={gridWidth}/>
            <CustomItemBar mode={mode} gridHeight={gridHeight} gridWidth={gridWidth} mirrorNum={reflectors.length + lenses.length} dropdownCellPos={dropdownCellPos} setDropdownCellPos={setDropdownCellPos}/>
            <Grid gridHeight={gridHeight} gridWidth={gridWidth}/>
            {children}
          </Layer>
          <Layer x={boardOrigin.x} y={boardOrigin.y} ref={layerRef}>
            <GridRay grid={gridRay.grid} Dgrid={gridRay.Dgrid}/>
            <CustomGrid mode={mode} isGettingThumbnail={Boolean(isGettingThumbnail)} gridHeight={gridHeight} gridWidth={gridWidth} dropdownCellPos={dropdownCellPos} setDropdownCellPos={setDropdownCellPos}/>
            <Lasers mode={mode} lasers={lasers} laserActions={laserActions} isValidCell={isValidCell}/>
            <Targets mode={mode} targets={targets} targetActions={targetActions} isValidCell={isValidCell} setMouseOnTarget={setMouseOnTarget} />
            <TutorialHint mode={mode} tutorialGoal={tutorialGoal}/>
          </Layer>
          <Layer x={boardOrigin.x} y={boardOrigin.y}>
            <Mirrors mode={mode} mirrors={[...reflectors, ...lenses]} mirrorActions={mirrorActions} isDraggable={isDraggable} isDisabled={isDisabled} isOnBoard={isOnBoard} isValidCell={isValidCell}/>
            <ColorMixingPopover isGettingThumbnail={Boolean(isGettingThumbnail)} target={mouseOnTarget}/>
            <AddObjectDropdown mode={mode} isGettingThumbnail={Boolean(isGettingThumbnail)} gridHeight={gridHeight} gridWidth={gridWidth} dropdownCellPos={dropdownCellPos} setDropdownCellPos={setDropdownCellPos} addObjects={addObjects}  />  
          </Layer>
          { 
            <Layer x={boardOrigin.x} y={8}>
              <DownloadButton levelInfo={state2info(levelState)}/>
            </Layer>
          }
        </Wrap>
      </div>
  );
})



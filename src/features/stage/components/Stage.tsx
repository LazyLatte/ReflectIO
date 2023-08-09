import {useState, useEffect, useLayoutEffect, FC, ReactNode, forwardRef, useImperativeHandle, createRef} from 'react';
import {Stage as Wrap, Layer} from 'react-konva';
import Konva from 'konva';
import Grid from './Grid';
import CustomGrid from './CustomGrid';
import ItemBar from './ItemBar';
import CustomItemBar from './CustomItemBar';
import Mirror from './Mirror';
import Lasers from './Lasers';
import Targets from './Targets';
import GridRay from './GridRay';
import ColorMixingPopover from './ColorMixingPopover';
import AddObjectDropdown from './AddObjectDropdown';
import TutorialHint from './TutorialHint';
import {useGridRay, useStageConfig} from '../hooks';
import {ObjectType, Level, Vector2D, Target, Mode} from '../interfaces';
import { TutorialGoal } from '@features/level';
// function downloadURI(uri: string, name: string) {
//   var link = document.createElement('a');
//   link.download = name;
//   link.href = uri;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

interface StageProps {
  mode: Mode;
  level: Level;
  tutorialGoal?: TutorialGoal;
  onClear: () => void;
  children?: ReactNode;
}
export interface StageHandle {
  getThumbnail: () => string | undefined;
}
export const Stage = forwardRef<StageHandle, StageProps>(({mode, level, tutorialGoal, onClear, children}, ref) => {
  const stageRef = createRef<Konva.Stage>()
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;
  const {height: gridHeight, width: gridWidth, lasers, targets, reflectors, lens} = levelState;
  
  const {cellWidth, shouldRearrange} = useStageConfig();
  const gridRay = useGridRay(gridHeight, gridWidth, lasers, reflectors, lens, targets, targetActions.setTargetClear);
  
  const boardOrigin: Vector2D = {x: (window.innerWidth-gridWidth*cellWidth) >> 1, y: 56};

  const isEmptyCell = (pos: Vector2D): boolean => (gridRay.grid[pos.y][pos.x].object.type === ObjectType.None);
  const isAnswerCell = (pos: Vector2D, idx: number): boolean => (tutorialGoal?.idx === idx && pos.x === tutorialGoal?.pos.x && pos.y === tutorialGoal?.pos.y);
  const isValidCell = (pos: Vector2D, idx: number): boolean => (mode!==Mode.Tutorial && isEmptyCell(pos)) || (mode===Mode.Tutorial && isAnswerCell(pos, idx));
  const isDisabled = (idx: number): boolean => (mode===Mode.Tutorial && (tutorialGoal?.idx !== idx || tutorialGoal.match !== "deg"));
  useLayoutEffect(()=>{
    mirrorActions.updateMirrorsResetPos(shouldRearrange);
  }, [shouldRearrange]);
  useEffect(()=>{
    let isClear = true;
    targets.forEach(target => {
      isClear &&= Boolean(target.clear);
    });
    isClear && onClear();
    setLevelClear(isClear);
  }, [gridRay])

  useImperativeHandle(ref, ()=>({
    getThumbnail: () => {
      return stageRef.current?.toDataURL({
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
        <Wrap width={window.innerWidth} height={window.innerHeight - 100} ref={stageRef}>
          <Layer x={boardOrigin.x} y={boardOrigin.y}>
            <ItemBar gridHeight={gridHeight} gridWidth={gridWidth}/>
            <CustomItemBar mode={mode} gridHeight={gridHeight} gridWidth={gridWidth} mirrorNum={reflectors.length + lens.length} dropdownCellPos={dropdownCellPos} setDropdownCellPos={setDropdownCellPos}/>
            <Grid gridHeight={gridHeight} gridWidth={gridWidth}/>
            {children}
          </Layer>
          <Layer x={boardOrigin.x} y={boardOrigin.y}>
            <GridRay grid={gridRay.grid} Dgrid={gridRay.Dgrid}/>
            <CustomGrid mode={mode} gridHeight={gridHeight} gridWidth={gridWidth} dropdownCellPos={dropdownCellPos} setDropdownCellPos={setDropdownCellPos}/>
            <Lasers mode={mode} lasers={lasers} laserActions={laserActions}/>
            <Targets mode={mode} targets={targets} setMouseOnTarget={setMouseOnTarget} targetActions={targetActions}/>
            <TutorialHint mode={mode} gridHeight={gridHeight} gridWidth={gridWidth} tutorialGoal={tutorialGoal}/>
          </Layer>
          <Layer x={boardOrigin.x} y={boardOrigin.y}>
            {[...reflectors, ...lens].map((m, idx) => (
              <Mirror mode={mode} mirror={m} mirrorActions={mirrorActions} validRange={{x: gridWidth, y: gridHeight}} isValidCell = {isValidCell} key={idx} disabled={isDisabled(m.idx)}/>
            ))}
            <ColorMixingPopover target={mouseOnTarget}/>
            <AddObjectDropdown mode={mode}  gridHeight={gridHeight} gridWidth={gridWidth} dropdownCellPos={dropdownCellPos} setDropdownCellPos={setDropdownCellPos} addObjects={addObjects}  />  
          </Layer>
        </Wrap>
      </div>
  );
})



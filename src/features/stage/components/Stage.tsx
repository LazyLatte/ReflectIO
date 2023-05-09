import {useState, useEffect, useLayoutEffect, FC, ReactNode} from 'react';
import {Stage as Wrap, Layer} from 'react-konva';
import { motion } from "framer-motion"
import Grid from './Grid';
import CustomGrid from './CustomGrid';
import ItemBar from './ItemBar';
import Mirror from './Mirror';
import Lasers from './Lasers';
import Targets from './Targets';
import GridRay from './GridRay';
import ColorMixingPopover from './ColorMixingPopover';
import AddObjectDropdown from './AddObjectDropdown';
import {useGridRay, useStageConfig} from '../hooks';
import {ObjectType, Level, Vector2D, Target, Mode} from '../interfaces';

interface StageProps {
  mode: Mode;
  level: Level;
  onClear: () => void;
  children: ReactNode;
}

const Stage: FC<StageProps> = ({mode, level, onClear, children}) => {
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;
  const {height: gridHeight, width: gridWidth, lasers, targets, reflectors, lens} = levelState;
  
  const {cellWidth, shouldRearrange} = useStageConfig();
  const gridRay = useGridRay(gridHeight, gridWidth, lasers, reflectors, lens, targets, targetActions.setTargetClear);
  
  const boardOrigin: Vector2D = {x: (window.innerWidth-gridWidth*cellWidth) >> 1, y: 56};

  const isEmptyCell = (pos: Vector2D): boolean => (gridRay.grid[pos.y][pos.x].object.type === ObjectType.None);
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

  const [mouseOnTarget, setMouseOnTarget] = useState<Target | null>(null);
  const [dropdownCellPos, setDropdownCellPos] = useState<Vector2D | null>(null);
  return (
      <motion.div 
        style={{position: 'absolute'}}
        onContextMenu={e => e.preventDefault()}
      >
        <Wrap width={window.innerWidth} height={window.innerHeight - 100} >
          <Layer x={boardOrigin.x} y={boardOrigin.y}>
            <Grid gridHeight={gridHeight} gridWidth={gridWidth}/>
            <ItemBar gridHeight={gridHeight} gridWidth={gridWidth}/>
            {children}
          </Layer>
          <Layer x={boardOrigin.x} y={boardOrigin.y}>
            <GridRay grid={gridRay.grid} Dgrid={gridRay.Dgrid}/>
            <CustomGrid mode={mode} gridHeight={gridHeight} gridWidth={gridWidth} dropdownCellPos={dropdownCellPos} setDropdownCellPos={setDropdownCellPos}/>
          </Layer>
          <Layer x={boardOrigin.x} y={boardOrigin.y}>
            <Lasers mode={mode} lasers={lasers} laserActions={laserActions}/>
            <Targets mode={mode} targets={targets} setMouseOnTarget={setMouseOnTarget} targetActions={targetActions}/>
            {reflectors.map((m, idx) => (
              <Mirror mode={mode} mirror={m}  mirrorActions={mirrorActions} validRange={{x: gridWidth, y: gridHeight}} isEmptyCell = {isEmptyCell} key={idx}/>
            ))}
            {lens.map((m, idx) => (
              <Mirror mode={mode} mirror={m}  mirrorActions={mirrorActions} validRange={{x: gridWidth, y: gridHeight}} isEmptyCell = {isEmptyCell} key={idx}/>
            ))}
            <ColorMixingPopover target={mouseOnTarget}/>
            <AddObjectDropdown mode={mode} dropdownCellPos={dropdownCellPos} setDropdownCellPos={setDropdownCellPos} addObjects={addObjects}  />  
          </Layer>
        </Wrap>
      </motion.div>
  );
}

export default Stage;


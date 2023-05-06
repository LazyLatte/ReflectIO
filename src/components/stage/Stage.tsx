import {useState, useEffect, FC, ReactNode} from 'react';
import {Stage as Wrap, Layer} from 'react-konva';
import Grid from './Grid';
import ItemBar from './ItemBar';
import GridRay from './GridRay';
import Mirror from './Mirror';
import Lasers from './Lasers';
import Targets from './Targets';
import ColorMixingPopover from './ColorMixingPopover';

import AddObjectDropdown from '../custom/AddObjectDropdown';
import CustomGrid from '../custom/CustomGrid';

import {useGridRay} from '../../hooks/useGridRay';
import {Level, Vector2D, Target} from '../../Interfaces';
import {ObjectType} from '../../Enums';
import useStageConfig from '../../hooks/useStageConfig';

import { motion } from "framer-motion"
interface StageProps {
  level: Level;
  clearCallback: () => void;
  children: ReactNode;
}

const Stage: FC<StageProps> = ({level, clearCallback, children}) => {
  const [levelState, mirrorActions, setTargetClear, setLevelClear, customizationTools] = level;
  const {height: gridHeight, width: gridWidth, lasers, targets, reflectors, lens, clear: historyClear} = levelState;
  
  const {cellWidth, shouldRearrange} = useStageConfig();
  const gridRay = useGridRay(gridHeight, gridWidth, lasers, reflectors, lens, targets, setTargetClear);
  
  const boardOrigin: Vector2D = {x: (window.innerWidth-gridWidth*cellWidth) >> 1, y: 56};

  const isEmptyCell = (pos: Vector2D): boolean => (gridRay.grid[pos.y][pos.x].object.type === ObjectType.None);
  useEffect(()=>{
    mirrorActions.updateMirrorResetPos(shouldRearrange);
  }, [shouldRearrange]);
  useEffect(()=>{
    let isClear = true;
    targets.forEach(target => {
      isClear &&= Boolean(target.clear);
    });
    isClear && clearCallback();
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
            <CustomGrid gridHeight={gridHeight} gridWidth={gridWidth} dropdownCellPos={dropdownCellPos} setDropdownCellPos={setDropdownCellPos} customizationTools={customizationTools}/>
          </Layer>
          <Layer x={boardOrigin.x} y={boardOrigin.y}>
            <Lasers lasers={lasers} customizationTools={customizationTools}/>
            <Targets targets={targets} setMouseOnTarget={setMouseOnTarget} customizationTools={customizationTools}/>
            {reflectors.map((m, idx) => (
              <Mirror mirror={m}  mirrorActions={mirrorActions} validRange={{x: gridWidth, y: gridHeight}} isEmptyCell = {isEmptyCell} customizationTools={customizationTools} key={idx}/>
            ))}
            {lens.map((m, idx) => (
              <Mirror mirror={m}  mirrorActions={mirrorActions} validRange={{x: gridWidth, y: gridHeight}} isEmptyCell = {isEmptyCell} customizationTools={customizationTools} key={idx}/>
            ))}
            <ColorMixingPopover target={mouseOnTarget}/>
            <AddObjectDropdown dropdownCellPos={dropdownCellPos} setDropdownCellPos={setDropdownCellPos} customizationTools={customizationTools}  />  
          </Layer>
        </Wrap>
      </motion.div>
  );
}

export default Stage;


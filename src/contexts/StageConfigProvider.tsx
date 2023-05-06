import {FC, useState, useEffect, createContext} from 'react';

export interface StageConfigContextInterface {
  cellWidth: number;
  shouldRearrange: boolean;
}
const StageConfigContext = createContext<StageConfigContextInterface | null>(null);

const shrinkThreshold = 1300;
const rearrangementThreshold = 850;
export const StageConfigProvider: FC<Provider> = ({children}) => {
  const [cellWidth, setCellWidth] = useState<number>(0);
  const [shouldRearrange, setShouldRearrange] = useState<boolean>(false);
  useEffect(()=>{
    function handleResize() {
      const stageHeight = window.innerHeight - 100;
      const stageWidth = window.innerWidth;
      const shouldShrinkBasedOnWidth = (stageWidth <= shrinkThreshold);
      const cellWidthBasedOnHeight =  Math.max(Math.min((stageHeight + 100) * 0.8 * 4  / 45, 80), 60);
      const newCellWidth = shouldShrinkBasedOnWidth ?  Math.max(0.05*(stageWidth - shrinkThreshold) + cellWidthBasedOnHeight, 45) : cellWidthBasedOnHeight;

      setCellWidth(newCellWidth);
      setShouldRearrange(stageWidth <= rearrangementThreshold);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <StageConfigContext.Provider value={{cellWidth, shouldRearrange}}>
      {children}
    </StageConfigContext.Provider>
  )
}

export default StageConfigContext;
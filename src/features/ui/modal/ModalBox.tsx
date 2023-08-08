import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
interface ModalBoxProps {
  height: number;
  width: number;
  children: ReactNode;
}
export const ModalBox: FC<ModalBoxProps> = ({height, width, children}) => {
  return (
    <Box 
      height={height} 
      width={width} 
      display='flex' 
      flexDirection='column' 
      justifyContent='space-around' 
      border='solid black' 
      borderRadius='5px'
      padding='16px' 
      sx={{
        backgroundColor: '#dddddd' 
      }}
    >
      {children}
    </Box>
  )
}

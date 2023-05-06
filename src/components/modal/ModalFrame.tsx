import * as React from 'react'
import Box from '@mui/material/Box';
const ModalFrame = ({height, width, children}) => {
  return (
    <Box height={height} width={width} display='flex' flexDirection='column' justifyContent='space-around' padding='16px' 
        backgroundColor='#dddddd' border='solid black' borderRadius='5px'
    >
      {children}
    </Box>
  )

}

export default ModalFrame;
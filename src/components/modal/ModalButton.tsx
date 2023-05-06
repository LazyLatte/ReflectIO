import * as React from 'react'
import Button from '@mui/material/Button';
const ModalButton = ({width, disabled = false, onClick, children}) => {
  return (
    <Button 
      disabled={disabled}
      onClick={onClick}
      sx={{
        width: width,
        height: '45px',
        fontSize: '2rem',
        backgroundColor: '#aaaaaa',
        border: '1px solid',
        padding: 0,
      }}
    >
      {children}
    </Button>
  )

}

export default ModalButton;
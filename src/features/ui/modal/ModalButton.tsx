import { FC, MouseEventHandler, ReactNode } from 'react';
import Button from '@mui/material/Button';

interface ModalButtonProps {
  width: string;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}
export const ModalButton: FC<ModalButtonProps> = ({width, disabled, onClick, children}) => {
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

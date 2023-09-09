import {FC, ReactNode} from 'react';
import Typography from '@mui/material/Typography';
import ToggledButton from './ToggledButton';
import { Link } from "react-router-dom";

const styles = {
  btn: {
    display:'flex',
    justifyContent:'flex-start',
    height: 120,
    width: '60%',
    minWidth: 700,
    borderRadius: '3px 0 0 3px',
    border: '2px solid',
    borderRight: 0,
    margin: '35px 0',
    paddingLeft: 5,
    transition: 'width 400ms ease',
    ':hover': {
      border: '2px solid',
      borderRight: 0,
      width: '62.5%',
      bgcolor: 'action.hover'
    },
  }
}
interface MenuButtonProps {
  themeColor: 'crimson' | 'magenta' | 'orange' | 'royalBlue' | 'green' | 'cyan';
  to: string;
  children: ReactNode;
};


const MenuButton: FC<MenuButtonProps> = ({themeColor, to, children}) => {
  return (
    <ToggledButton color={themeColor} sx={{...styles.btn}} component={Link} to={to}>
      <Typography variant="menu" color={themeColor + '.light'}>
        {children}
      </Typography>
    </ToggledButton>
  );
}

export default MenuButton;


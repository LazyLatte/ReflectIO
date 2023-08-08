import {FC, ReactNode} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PaletteColorOptions, TypographyVariantsOptions  } from "@mui/material";
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
    '&:hover': {
      border: '2px solid',
      borderRight: 0,
      width: '62.5%',
      backgroundColor: '#181f31'
    }
  }
}
interface MenuButtonProps {
  themeColor: 'crimson' | 'magenta' | 'orange' | 'royalBlue' | 'green' | 'cyan';
  to: string;
  children: ReactNode;
};

declare module '@mui/material/styles' {
  interface CustomPalette {
    crimson: PaletteColorOptions;
    magenta: PaletteColorOptions;
    orange: PaletteColorOptions;
    royalBlue: PaletteColorOptions;
    green: PaletteColorOptions;
    cyan: PaletteColorOptions;
  }
  interface CustomTypography {
    menu: TypographyVariantsOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
  interface Typography extends CustomTypography {}
  interface TypographyOptions extends CustomTypography {}
}
  
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        crimson: true;
        magenta: true;
        orange: true;
        royalBlue: true;
        green: true;
        cyan: true;
    }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    menu: true;
  }
}
const MenuButton: FC<MenuButtonProps> = ({themeColor, to, children}) => {
  const borderColor = themeColor;
  const textColor = themeColor + '.light';
  return (
    <Button variant="outlined" color={borderColor} sx={{...styles.btn}} component={Link} to={to}>
      <Typography variant="menu" color={textColor}>
        {children}
      </Typography>
    </Button>
  );
}

export default MenuButton;


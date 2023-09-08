import { CSSProperties } from "react";
import { Palette, PaletteOptions} from "@mui/material";
declare module '@mui/material/styles' {
  /* Palette */
  interface Palette {
    crimson: Palette['primary'];
    magenta: Palette['primary'];
    orange: Palette['primary'];
    royalBlue: Palette['primary'];
    green: Palette['primary'];
    cyan: Palette['primary'];
    contrast: Palette['primary'];
    display: Palette['primary'];
  }

  interface PaletteOptions {
    crimson?: PaletteOptions['primary'];
    magenta?: PaletteOptions['primary'];
    orange?: PaletteOptions['primary'];
    royalBlue?: PaletteOptions['primary'];
    green?: PaletteOptions['primary'];
    cyan?: PaletteOptions['primary'];
    contrast?: PaletteOptions['primary'];
    display?: PaletteOptions['primary'];
  }

  /* Typography */
  interface TypographyVariants {
    menu: CSSProperties;
    search: CSSProperties;
  }

  interface TypographyVariantsOptions {
    menu: CSSProperties;
    search: CSSProperties;
  }
}


declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    crimson: true;
    magenta: true;
    orange: true;
    royalBlue: true;
    green: true;
    cyan: true;
    contrast: true;
    display: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    menu: true;
    search: true;
  }
}



import { CSSProperties } from "react";
import { Palette, PaletteOptions, TypographyProps} from "@mui/material";
declare module '@mui/material/styles' {
  /* Palette */
  interface Palette {
    crimson: Palette['primary'];
    magenta: Palette['primary'];
    orange: Palette['primary'];
    royalBlue: Palette['primary'];
    green: Palette['primary'];
    cyan: Palette['primary'];
    neutral: Palette['primary'];
    tutorial: Palette['primary'];
    contrast: Palette['primary'];
    enter: Palette['primary'];
  }

  interface PaletteOptions {
    crimson?: PaletteOptions['primary'];
    magenta?: PaletteOptions['primary'];
    orange?: PaletteOptions['primary'];
    royalBlue?: PaletteOptions['primary'];
    green?: PaletteOptions['primary'];
    cyan?: PaletteOptions['primary'];
    neutral?: PaletteOptions['primary'];
    tutorial?: PaletteOptions['primary'];
    contrast?: PaletteOptions['primary'];
    enter?: PaletteOptions['primary'];
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
    neutral: true;
    tutorial: true;
    contrast: true;
    enter: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    menu: true;
    search: true;
  }
}



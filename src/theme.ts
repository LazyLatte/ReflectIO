export const tokens = (mode: 'light' | 'dark') => ({
    ...(mode === 'dark' ?
        {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414"
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#434957",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509"
            },
            secondary: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922"
            },
            green: {
                100: "#ccf0cc",
                200: "#99e199",
                300: "#66d166",
                400: "#33c233",
                500: "#00b300",
                600: "#008f00",
                700: "#006b00",
                800: "#004800",
                900: "#002400"
            },
            magenta: {
                100: "#f8d6f8",
                200: "#f1adf1",
                300: "#eb85eb",
                400: "#e45ce4",
                500: "#dd33dd",
                600: "#b129b1",
                700: "#851f85",
                800: "#581458",
                900: "#2c0a2c"
            },
            red: {
                100: "#fbd5dd",
                200: "#f7abba",
                300: "#f38198",
                400: "#ef5775",
                500: "#eb2d53",
                600: "#bc2442",
                700: "#8d1b32",
                800: "#5e1221",
                900: "#2f0911"
            },
            orange: {
                100: "#fae5cc",
                200: "#f5cb99",
                300: "#f0b266",
                400: "#eb9833",
                500: "#e67e00",
                600: "#b86500",
                700: "#8a4c00",
                800: "#5c3200",
                900: "#2e1900"
            },
            blue: {
                100: "#d9e1f9",
                200: "#b3c3f3",
                300: "#8da5ed",
                400: "#6787e7",
                500: "#4169e1",
                600: "#3454b4",
                700: "#273f87",
                800: "#1a2a5a",
                900: "#0d152d"
            },
            cyan: {
                100: "#ccf2f2",
                200: "#99e6e6",
                300: "#66d9d9",
                400: "#33cdcd",
                500: "#00c0c0",
                600: "#009a9a",
                700: "#007373",
                800: "#004d4d",
                900: "#002626"
            }
        } : {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414"
            },
            primary: {
                100: "#fffaf9",
                200: "#fff4f3",
                300: "#ffefed",
                400: "#ffe9e7",
                500: "#ffe4e1",
                600: "#ccb6b4",
                700: "#998987",
                800: "#665b5a",
                900: "#332e2d"
            },
            secondary: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922"
            },
            green: {
                100: "#ccf0cc",
                200: "#99e199",
                300: "#66d166",
                400: "#33c233",
                500: "#00b300",
                600: "#008f00",
                700: "#006b00",
                800: "#004800",
                900: "#002400"
            },
            magenta: {
                100: "#f8d6f8",
                200: "#f1adf1",
                300: "#eb85eb",
                400: "#e45ce4",
                500: "#dd33dd",
                600: "#b129b1",
                700: "#851f85",
                800: "#581458",
                900: "#2c0a2c"
            },
            red: {
                100: "#fbd5dd",
                200: "#f7abba",
                300: "#f38198",
                400: "#ef5775",
                500: "#eb2d53",
                600: "#bc2442",
                700: "#8d1b32",
                800: "#5e1221",
                900: "#2f0911"
            },
            orange: {
                100: "#fae5cc",
                200: "#f5cb99",
                300: "#f0b266",
                400: "#eb9833",
                500: "#e67e00",
                600: "#b86500",
                700: "#8a4c00",
                800: "#5c3200",
                900: "#2e1900"
            },
            blue: {
                100: "#d9e1f9",
                200: "#b3c3f3",
                300: "#8da5ed",
                400: "#6787e7",
                500: "#4169e1",
                600: "#3454b4",
                700: "#273f87",
                800: "#1a2a5a",
                900: "#0d152d"
            },
            cyan: {
                100: "#ccf2f2",
                200: "#99e6e6",
                300: "#66d9d9",
                400: "#33cdcd",
                500: "#00c0c0",
                600: "#009a9a",
                700: "#007373",
                800: "#004d4d",
                900: "#002626"
            }
        }
    )
  })

export const themeSettings = (mode: 'light' | 'dark') => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark' ?
                {
                    primary: {
                        dark: colors.primary[700],
                        main: colors.primary[600],
                        light: colors.primary[500],
                        contrastText: '#fff',
                    },
                    secondary: {
                        main: colors.secondary[500]
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100]
                    },
                    crimson: {
                        dark: colors.red[700],
                        main: colors.red[600],
                        light: colors.red[500]
                    },
                    magenta: {
                        dark: colors.magenta[700],
                        main: colors.magenta[600],
                        light: colors.magenta[500]
                    },
                    orange: {
                        dark: colors.orange[700],
                        main: colors.orange[600],
                        light: colors.orange[500]
                    },
                    royalBlue: {
                        dark: colors.blue[700],
                        main: colors.blue[600],
                        light: colors.blue[300]
                    },
                    green: {
                        dark: colors.green[700],
                        main: colors.green[600],
                        light: colors.green[500]
                    },
                    cyan: {
                        dark: colors.cyan[700],
                        main: colors.cyan[600],
                        light: colors.cyan[500]
                    },
                    contrast: {
                        main: '#fff'
                    },
                    enter: {
                        main: '#FFD700'
                    },
                    tutorial: {
                        main: '#fff'
                    },
                    background: {
                        default: colors.primary[600]
                    },
                    action: {
                        hover: colors.primary[500],
                        active: colors.primary[400],
                        selected: '#181f31',
                    }
                } 
                :
                {
                    primary: {
                        dark: colors.primary[600],
                        main: colors.primary[500],
                        light: colors.primary[400],
                    },
                    secondary: {
                        main: colors.secondary[500]
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: "#ccf0cc",
                        light: colors.grey[100]
                    },
                    crimson: {
                        main: colors.red[500],
                        light: colors.red[100]
                    },
                    magenta: {
                        main: colors.magenta[500],
                        light: colors.magenta[100]
                    },
                    orange: {
                        main: colors.orange[500],
                        light: colors.orange[100]
                    },
                    royalBlue: {
                        main: colors.blue[500],
                        light: colors.blue[100]
                    },
                    green: {
                        main: colors.green[400],
                        light: colors.green[100]
                    },
                    cyan: {
                        main: colors.cyan[500],
                        light: colors.cyan[100]
                    },
                    contrast: {
                        main: "#33ccc7"
                    },
                    enter: {
                        main: '#00cc7e',
                    },
                    tutorial: {
                        main: "#ccf0cc"
                    },
                    background: {
                        default: colors.primary[500]
                    },
                    action: {
                        hover: undefined,
                        active: '#efd4d1',
                        selected: '#181f31',
                    }
                }
            )
        },
        typography: {
            fontFamily: ["Roboto","Helvetica","Arial", "sans-serif"].join(","),
            fontSize: 24,
            
            caption: {
                fontFamily: ['Trebuchet MS', 'sans-serif'].join(","),
                fontSize: 32,
                fontWeight: 'bold',
                color: '#222222',
                letterSpacing: '2px'
            },
            h1: {
                fontFamily: ['Orbitron', 'sans-serif'].join(","),
                fontSize: 45,
                fontWeight: 900,
                letterSpacing: 8
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20
            },
            h5: {
                fontFamily: ["Roboto","Helvetica","Arial", "sans-serif"].join(","),
                fontSize: 16
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontWeight: 'bold',
                fontSize: 14,
                color: '#222222',
                letterSpacing: '2px'
            },
            p: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontWeight: 'bold',
                fontSize: 14
            },
            menu: {
                fontFamily: ['Orbitron', 'sans-serif'].join(","),
                fontSize: 45,
                fontWeight: 900,
                letterSpacing: 8
            },
            search: {
                fontFamily: ['Orbitron', 'sans-serif'].join(","),
                fontSize: 28,
                fontWeight: 'bold',
                letterSpacing: 4,
                color: '#072c28'
            }
        }
    }
}
  

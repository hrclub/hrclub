import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {},
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiLink: {
      defaultProps: {
        variant: "body2",
      },
    },
    MuiGrid: {
      defaultProps: {
        spacing: 2,
      },
    },
  },
});

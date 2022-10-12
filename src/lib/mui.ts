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
        color: "inherit",
      },
    },
    MuiLink: {
      defaultProps: {
        variant: "body2",
        underline: "none",
        color: "initial",
      },
    },
    MuiGrid: {
      defaultProps: {
        spacing: 2,
      },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiListItem: {
      defaultProps: {
        disablePadding: true,
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: "small",
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "default",
      },
    },
  },
});

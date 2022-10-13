import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
  },
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
        color: "inherit",
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
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTableRow: {
      defaultProps: {
        hover: true,
      },
    },
    MuiTableCell: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        head: {
          fontSize: "13px",
        },
      },
    },
  },
});

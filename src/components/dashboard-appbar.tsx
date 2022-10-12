import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDashboardLayoutWidth,
  toggleDashboardLayoutOpen,
} from "slices/dashboard-layout";

export default function DashboardAppbar() {
  const dispatch = useDispatch();
  const width = useSelector(selectDashboardLayoutWidth());

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${width}px)` },
        ml: { sm: `${width}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleDashboardLayoutOpen())}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

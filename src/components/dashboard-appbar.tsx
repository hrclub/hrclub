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
import { Avatar } from "@mui/material";
import { MouseEvent } from "react";
import { setOpenProfileMenu } from "slices/profile-menu";

export default function DashboardAppbar() {
  const dispatch = useDispatch();
  const width = useSelector(selectDashboardLayoutWidth());

  function onProfileMenu(e: MouseEvent) {
    dispatch(setOpenProfileMenu({ x: e.clientX, y: e.clientY }));
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${width}px)` },
        ml: { sm: `${width}px` },
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(255,255,255,0.8)",
      }}
      color="transparent"
      elevation={0}
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
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Appbar
        </Typography>
        <Avatar sx={{ cursor: "pointer" }} onClick={onProfileMenu}>
          T
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}

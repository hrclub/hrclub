import Drawer from "@mui/material/Drawer";
import DashboardDrawerMenu from "./dashboard-drawer-menu";

const drawerWidth = 240;

export default function DashboardDrawerPermanent() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
      open
    >
      <DashboardDrawerMenu />
    </Drawer>
  );
}

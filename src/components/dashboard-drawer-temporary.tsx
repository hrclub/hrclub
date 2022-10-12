import Drawer from "@mui/material/Drawer";
import DashboardDrawerMenu from "./dashboard-drawer-menu";

interface DashboardDrawerTemporaryProps {
  open: boolean;
  toggleDrawer: Function;
}

const drawerWidth = 240;

export default function DashboardDrawerTemporary(
  props: DashboardDrawerTemporaryProps
) {
  const { open, toggleDrawer } = props;

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={() => toggleDrawer()}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <DashboardDrawerMenu />
    </Drawer>
  );
}

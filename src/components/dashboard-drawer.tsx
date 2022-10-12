import Box from "@mui/material/Box";
import DashboardDrawerPermanent from "./dashboard-drawer-permament";
import DashboardDrawerTemporary from "./dashboard-drawer-temporary";

interface DashboardDrawerProps {
  open: boolean;
  toggleDrawer: Function;
}

const drawerWidth = 240;

export default function DashboardDrawer(props: DashboardDrawerProps) {
  const { open, toggleDrawer } = props;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <DashboardDrawerTemporary
        open={open}
        toggleDrawer={() => toggleDrawer()}
      />
      <DashboardDrawerPermanent />
    </Box>
  );
}

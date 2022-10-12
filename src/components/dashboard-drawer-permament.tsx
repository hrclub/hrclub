import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import { selectDashboardLayoutWidth } from "slices/dashboard-layout";
import DashboardDrawerMenu from "./dashboard-drawer-menu";

export default function DashboardDrawerPermanent() {
  const width = useSelector(selectDashboardLayoutWidth());

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width,
        },
      }}
      open
    >
      <DashboardDrawerMenu />
    </Drawer>
  );
}

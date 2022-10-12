import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { selectDashboardLayoutWidth } from "slices/dashboard-layout";
import DashboardDrawerPermanent from "./dashboard-drawer-permament";
import DashboardDrawerTemporary from "./dashboard-drawer-temporary";

export default function DashboardDrawer() {
  const width = useSelector(selectDashboardLayoutWidth());

  return (
    <Box
      component="nav"
      sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <DashboardDrawerTemporary />
      <DashboardDrawerPermanent />
    </Box>
  );
}

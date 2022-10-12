import { useState } from "react";

import Box from "@mui/material/Box";
import DashboardAppbar from "./dashboard-appbar";
import DashboardDrawer from "./dashboard-drawer";
import DashboardMain from "./dashboard-main";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout(props: Props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DashboardAppbar toggleDrawer={handleDrawerToggle} />
      <DashboardDrawer open={mobileOpen} toggleDrawer={handleDrawerToggle} />
      <DashboardMain>{children}</DashboardMain>
    </Box>
  );
}

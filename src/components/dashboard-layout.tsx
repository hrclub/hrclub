import Box from "@mui/material/Box";
import DashboardAppbar from "./dashboard-appbar";
import DashboardDrawer from "./dashboard-drawer";
import DashboardMain from "./dashboard-main";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout(props: Props) {
  const { children } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <DashboardAppbar />
      <DashboardDrawer />
      <DashboardMain>{children}</DashboardMain>
    </Box>
  );
}

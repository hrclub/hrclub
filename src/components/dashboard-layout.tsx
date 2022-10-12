import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { selectProfileMenuOpen } from "slices/profile-menu";
import DashboardAppbar from "./dashboard-appbar";
import DashboardDrawer from "./dashboard-drawer";
import DashboardMain from "./dashboard-main";
import ProfileMenu from "./profile-menu";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout(props: Props) {
  const { children } = props;
  const open = useSelector(selectProfileMenuOpen());

  return (
    <Box sx={{ display: "flex" }}>
      <DashboardAppbar />
      <DashboardDrawer />
      <DashboardMain>{children}</DashboardMain>

      {open && <ProfileMenu />}
    </Box>
  );
}

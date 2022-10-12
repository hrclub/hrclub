import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDashboardLayoutOpen,
  selectDashboardLayoutWidth,
  toggleDashboardLayoutOpen,
} from "slices/dashboard-layout";
import DashboardDrawerMenu from "./dashboard-drawer-menu";

export default function DashboardDrawerTemporary() {
  const dispatch = useDispatch();
  const open = useSelector(selectDashboardLayoutOpen());
  const width = useSelector(selectDashboardLayoutWidth());

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={() => dispatch(toggleDashboardLayoutOpen())}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width,
        },
      }}
    >
      <DashboardDrawerMenu />
    </Drawer>
  );
}

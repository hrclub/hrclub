import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useSelector } from "react-redux";
import { selectDashboardLayoutWidth } from "slices/dashboard-layout";

interface DashboardMainProps {
  children: React.ReactNode;
}

export default function DashboardMain(props: DashboardMainProps) {
  const { children } = props;
  const width = useSelector(selectDashboardLayoutWidth());

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${width}px)` },
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}

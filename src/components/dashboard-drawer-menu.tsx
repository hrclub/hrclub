import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyIcon from "@mui/icons-material/Key";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function DashboardDrawerMenu() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/dashboard")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={t("Dashboard")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/dashboard/permissions")}>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary={t("Permission")} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

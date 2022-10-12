import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyIcon from "@mui/icons-material/Key";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";

interface Route {
  path: string;
  text: string;
  icon: any;
  action?: React.ReactNode;
}

export default function DashboardDrawerMenu() {
  const { t } = useTranslation();
  const router = useRouter();

  const routes: Route[] = [
    {
      path: "/",
      text: "Homepage",
      icon: HomeIcon,
    },
    {
      path: "/dashboard",
      text: "Dashboard",
      icon: DashboardIcon,
    },
    {
      path: "/dashboard/permissions",
      text: "Permissions",
      icon: KeyIcon,
      action: (
        <IconButton
          onClick={() => router.push("/dashboard/permissions/create")}
          edge="end"
        >
          <AddIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {routes.map((route) => (
          <ListItem key={route.path} secondaryAction={route.action}>
            <ListItemButton
              onClick={() => router.push(route.path)}
              selected={router.asPath === route.path}
            >
              <ListItemIcon>
                <route.icon />
              </ListItemIcon>
              <ListItemText primary={t(route.text)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

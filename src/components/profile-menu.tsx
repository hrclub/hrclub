import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfileMenuOpen,
  selectProfileMenuPosition,
  setCloseProfileMenu,
} from "slices/profile-menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "next-i18next";
import { signOut } from "next-auth/react";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";

export default function ProfileMenu() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const open = useSelector(selectProfileMenuOpen());
  const position = useSelector(selectProfileMenuPosition());

  return (
    <Menu
      open={open}
      anchorPosition={{ top: position.y, left: position.x }}
      onClose={() => dispatch(setCloseProfileMenu())}
      anchorReference="anchorPosition"
    >
      <MenuItem onClick={() => router.push("/account/profile")}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText>{t("Profile")}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>{t("Sign out")}</ListItemText>
      </MenuItem>
    </Menu>
  );
}

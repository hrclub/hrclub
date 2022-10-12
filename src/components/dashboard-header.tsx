import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Breadcrumbs from "./breadcrumbs";

interface DashboardHeaderProps {
  actions?: React.ReactNode;
}

export default function DashboardHeader(props: DashboardHeaderProps) {
  const { actions } = props;
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Box sx={{ mt: 4, mb: 6, display: "flex", alignItems: "center" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {t(router.asPath)}
        </Typography>
        <Breadcrumbs />
      </Box>
      <Box>{actions}</Box>
    </Box>
  );
}

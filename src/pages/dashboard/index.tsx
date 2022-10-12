import { requireAuth } from "utils/require-auth";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DashboardLayout from "components/dashboard-layout";
import { Container } from "@mui/material";
import Head from "next/head";
import DashboardHeader from "components/dashboard-header";

export const getServerSideProps = requireAuth(async (ctx) => {
  const translations = await serverSideTranslations(ctx.locale!);

  return {
    props: {
      ...translations,
    },
  };
});

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <Container component="main">
        <Head>
          <title>{t("Dashboard")}</title>
          <meta name="description" content={t("Dashboard page")} />
        </Head>
        <DashboardHeader />
        <p>{t("Dashboard")}</p>
      </Container>
    </DashboardLayout>
  );
}

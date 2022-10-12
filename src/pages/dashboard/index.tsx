import { requireAuth } from "utils/require-auth";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DashboardLayout from "components/dashboard-layout";
import { Container } from "@mui/material";
import Head from "next/head";

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
  const { data } = useSession();

  return (
    <DashboardLayout>
      <Container component="main">
        <Head>
          <title>{t("Dashboard")}</title>
          <meta name="description" content={t("Dashboard page")} />
        </Head>
        <p>{t("Dashboard")}</p>
      </Container>
    </DashboardLayout>
  );
}

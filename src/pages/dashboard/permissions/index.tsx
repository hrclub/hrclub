import Container from "@mui/material/Container";
import DashboardLayout from "components/dashboard-layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { requireAuth } from "utils/require-auth";

export const getServerSideProps = requireAuth(async (ctx) => {
  const translations = await serverSideTranslations(ctx.locale!);

  return {
    props: {
      ...translations,
    },
  };
});

export default function Permissions() {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <Container component="main">
        <Head>
          <title>{t("Permission")}</title>
          <meta name="description" content={t("Permission page")} />
        </Head>
        <p>{t("Permission")}</p>
      </Container>
    </DashboardLayout>
  );
}

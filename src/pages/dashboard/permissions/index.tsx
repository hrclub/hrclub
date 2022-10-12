import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import DashboardHeader from "components/dashboard-header";
import DashboardLayout from "components/dashboard-layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { requireAuth } from "utils/require-auth";
import AddIcon from "@mui/icons-material/Add";

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
  const router = useRouter();

  console.log({ router });

  return (
    <DashboardLayout>
      <Container component="main">
        <Head>
          <title>{t("Permission")}</title>
          <meta name="description" content={t("Permission page")} />
        </Head>
        <DashboardHeader
          actions={
            <Button
              onClick={() => router.push(router.pathname + "/create")}
              startIcon={<AddIcon />}
            >
              {t("Create permission")}
            </Button>
          }
        />
        <p>{t("Permission")}</p>
      </Container>
    </DashboardLayout>
  );
}

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
import { trpc } from "lib/trpc";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import { formatDate } from "utils/format-date";
import { ChangeEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

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
  const permissions = trpc.useQuery(["permissions"]);
  const [search, setSearch] = useState<string>("");

  if (permissions.isLoading) return <div>Loading...</div>;
  if (permissions.isError) return <div>Error...</div>;
  if (!permissions.data) return <div>No data...</div>;

  function onSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function onSearchClick() {
    permissions.refetch();
  }

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

        <Toolbar>
          <TextField label={t("Search")} onChange={onSearch} value={search} />
          <IconButton onClick={onSearchClick}>
            <SearchIcon />
          </IconButton>
        </Toolbar>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" align="right">
                  {t("#")}
                </TableCell>
                <TableCell>{t("Permission name")}</TableCell>
                <TableCell>{t("Permission description")}</TableCell>
                <TableCell>{t("Permission slug")}</TableCell>
                <TableCell>{t("Is active")}</TableCell>
                <TableCell>{t("Created at")}</TableCell>
                <TableCell>{t("Updated at")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.data.map((permission, i: number) => (
                <TableRow key={permission.id}>
                  <TableCell padding="checkbox" align="right">
                    {i + 1}
                  </TableCell>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                  <TableCell>{permission.slug}</TableCell>
                  <TableCell>{permission.active ? "???" : "???"}</TableCell>
                  <TableCell>{formatDate(permission.createdAt)}</TableCell>
                  <TableCell>{formatDate(permission.updatedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </DashboardLayout>
  );
}

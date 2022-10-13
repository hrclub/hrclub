import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import DashboardHeader from "components/dashboard-header";
import DashboardLayout from "components/dashboard-layout";
import { trpc } from "lib/trpc";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { requireAuth } from "utils/require-auth";
import {
  createPermissionSchema,
  CreatePermissionSchema,
} from "validations/permission";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";

export const getServerSideProps = requireAuth(async (ctx) => {
  const translations = await serverSideTranslations(ctx.locale!);

  return {
    props: {
      ...translations,
    },
  };
});

export default function CreatePermission() {
  const { t } = useTranslation();
  z.setErrorMap(makeZodI18nMap(t));
  const router = useRouter();
  const { handleSubmit, control } = useForm<CreatePermissionSchema>({
    resolver: zodResolver(createPermissionSchema),
  });
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = trpc.useMutation(["create-permission"], {
    onSuccess(data) {
      router.push("/dashboard/permissions");
      enqueueSnackbar(t(data.message), { variant: "success" });
    },
    onError(error) {
      enqueueSnackbar(t(error.message, { ns: "validation" }), {
        variant: "error",
      });
    },
  });

  return (
    <DashboardLayout>
      <Container component="main">
        <Head>
          <title>{t("Create permission")}</title>
          <meta name="description" content={t("Create permission page")} />
        </Head>

        <DashboardHeader />

        <Box component="form" onSubmit={handleSubmit((data) => mutate(data))}>
          <Grid container>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="name"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    autoFocus
                    label={t("Permission name")}
                    error={!!error}
                    helperText={error && error.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="description"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Permission description")}
                    error={!!error}
                    helperText={error && error.message}
                    multiline
                    rows={6}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                type="submit"
                loading={isLoading}
                startIcon={<AddIcon />}
              >
                {t("Create permission")}
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </DashboardLayout>
  );
}

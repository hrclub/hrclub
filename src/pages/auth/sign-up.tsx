import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { ISignUp, signUpSchema } from "validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "lib/trpc";
import { useCallback } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSnackbar } from "notistack";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { TRPCClientError } from "@trpc/client";

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const translations = await serverSideTranslations(ctx.locale || "");

  return {
    props: {
      ...translations,
    },
  };
}

export default function SignUp() {
  const { t } = useTranslation();
  const router = useRouter();
  const { handleSubmit, control } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync } = trpc.useMutation(["sign-up"]);

  const onSubmit = useCallback(
    async function (data: ISignUp) {
      try {
        const result = await mutateAsync(data);

        if (result.status === 201) {
          router.push("/auth/sign-in");

          enqueueSnackbar(result.message, { variant: "success" });
        }
      } catch (err) {
        if (err instanceof TRPCClientError) {
          enqueueSnackbar(t(err.message, { ns: "validation" }), {
            variant: "error",
          });
        }
      }
    },
    [mutateAsync, router]
  );

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>{t("Sign up")}</title>
        <meta name="description" content={t("Sign up page")} />
      </Head>

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>{t("Sign up")}</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Grid container sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="lastname"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    autoFocus
                    label={t("Last name")}
                    error={error !== undefined}
                    helperText={error ? error.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="firstname"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("First name")}
                    error={error !== undefined}
                    helperText={error ? error.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="username"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Username")}
                    error={error !== undefined}
                    helperText={error ? error.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t("Email")}
                    error={error !== undefined}
                    helperText={error ? error.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="password"
                    fullWidth
                    label={t("Password")}
                    error={error !== undefined}
                    helperText={error ? error.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="verifyPassword"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="password"
                    fullWidth
                    label={t("Verify password")}
                    error={error !== undefined}
                    helperText={error ? error.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit">
                {t("Sign up")}
              </Button>
            </Grid>
            <Grid item xs>
              <NextLink href="/auth/sign-in" passHref>
                <Link>{t("Go to sign in")}</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

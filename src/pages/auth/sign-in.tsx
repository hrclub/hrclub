import Head from "next/head";
import NextLink from "next/link";
import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, ISignIn } from "validations/auth";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTranslation } from "next-i18next";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const translations = await serverSideTranslations(ctx.locale || "");

  return {
    props: {
      ...translations,
    },
  };
}

export default function Signin() {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<ISignIn>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = useCallback(async function (data: ISignIn) {
    await signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>{t("hello")}</title>
        <meta name="description" content={t("Sign in page")} />
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
        <Typography>{t("Sign in")}</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Grid container sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    autoFocus
                    label={t("Email")}
                    error={error !== undefined}
                    helperText={error ? error.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit">
                {t("Sign in")}
              </Button>
            </Grid>
            <Grid item xs>
              <NextLink href="/auth/sign-up" passHref>
                <Link>{t("Go to sign up")}</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

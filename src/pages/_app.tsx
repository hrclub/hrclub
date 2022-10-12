import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { theme } from "lib/mui";
import { createEmotionCache } from "lib/emotion";
import "@fontsource/inter/400.css";
import { Session } from "next-auth";
import { withTRPC } from "@trpc/next";
import { ServerRouter } from "server/router";
import { SnackbarProvider } from "notistack";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
  pageProps: {
    session?: Session;
  };
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <SnackbarProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </SnackbarProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default withTRPC<ServerRouter>({
  config() {
    const vercelURL = process.env.VERCEL_URL;
    const localURL = "localhost:3000";

    const url = vercelURL
      ? `https://${vercelURL}/api/trpc`
      : `http://${localURL}/api/trpc`;

    return {
      url,
      headers: {
        "x-ssr": "1",
      },
    };
  },
  ssr: true,
})(MyApp);

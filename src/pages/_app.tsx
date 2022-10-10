import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "utils/theme";
import createEmotionCache from "utils/create_emotion_cache";

import "@fontsource/inter/400.css";
import { Session } from "next-auth";
import Auth from "components/auth";
import { NextPageContext } from "next/types";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
  pageProps: {
    session?: Session;
  };
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <CssBaseline />
          {/* @ts-ignore */}
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

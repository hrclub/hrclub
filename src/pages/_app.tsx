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
import { appWithTranslation, i18n } from "next-i18next";
import { wrapper } from "lib/redux";
import { Provider } from "react-redux";

if (process.env.NODE_ENV !== "production") {
  if (typeof window !== "undefined") {
    const { applyClientHMR } = require("i18next-hmr/client");
    applyClientHMR(() => i18n);
  } else {
    const { applyServerHMR } = require("i18next-hmr/server");
    applyServerHMR(() => i18n);
  }
}

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
  pageProps: {
    session?: Session;
  };
}

function MyApp({ Component, ...rest }: MyAppProps) {
  const { props, store } = wrapper.useWrappedStore(rest);
  const { pageProps, emotionCache = clientSideEmotionCache } = props;

  return (
    <Provider store={store}>
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
    </Provider>
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
  //@ts-ignore
})(appWithTranslation(MyApp));

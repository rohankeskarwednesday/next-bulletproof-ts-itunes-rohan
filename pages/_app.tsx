// import "../styles/globals.css";
import "../styles/global.less";
import type { AppProps } from "next/app";
import { ErrorBoundary } from "@common";
import Head from "next/head";
import { IntlProvider } from "react-intl";
import { Provider as ReduxProvider } from "react-redux";
import { messages } from "../translations/messages";
import { store } from "@store";
import { useEffect, useState } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    setLocale(navigator.language);
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>Search for songs</title>
      </Head>
      <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en">
        <ReduxProvider store={store}>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ReduxProvider>
      </IntlProvider>
    </>
  );
};

export default MyApp;

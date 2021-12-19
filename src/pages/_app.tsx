import type { AppProps } from "next/app";
import AppWrapper from "../components/AppWrapper";
import "regenerator-runtime/runtime";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
};

export default MyApp;

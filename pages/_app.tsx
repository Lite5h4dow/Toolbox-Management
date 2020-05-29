import App, { AppProps } from "next/app";
import "semantic-ui-css/semantic.min.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
}

export default MyApp;

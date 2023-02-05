import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "store";
import "../styles/output.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
};

export default App;

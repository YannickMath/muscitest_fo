import "@/styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "../redux/store";
import Layout from "@/component/Layout";
import { useState } from "react";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toogleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark");
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} toogleDarkMode={toogleDarkMode}>
          <Component
            {...pageProps}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            toogleDarkMode={toogleDarkMode}
          />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

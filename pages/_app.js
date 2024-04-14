import "@/styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import PropTypes from "prop-types";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

const progress = new ProgressBar({
  size: 4,
  color: "#059669",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const App = (props) => {
  const { Component, pageProps } = props;

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </SessionProvider>
  );
};

export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

import 'bootstrap/dist/css/bootstrap.css';

// Component wrapper. Wraps other pages in this
const app = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default app;

import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

// Component wrapper. Wraps other pages in this
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <h1>Hello {currentUser.email}</h1>
      <Component {...pageProps} />
    </>
  );
};

// This is not a page component, so the context here is built like this: { Component, ctx: { req,res }, etc... }
AppComponent.getInitialProps = async ({ Component, ctx }) => {
  const { data } = await buildClient(ctx).get('/api/users/currentuser');
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx); // Call getInitialProps manually on page components
  }

  return { pageProps, ...data };
};

export default AppComponent;

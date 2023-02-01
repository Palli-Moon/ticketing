import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  // console.log in here would be written in chrome (the browser)
  return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
};

// nextjs specific
// Always executed on the server EXCEPT when navigating from one page to another while in the app
LandingPage.getInitialProps = async (context) => {
  // console.log in here would be written in nodejs (on the server) except if redirected inside the app
  const { data } = await buildClient(context).get('/api/users/currentuser');
  return data;
};

export default LandingPage;

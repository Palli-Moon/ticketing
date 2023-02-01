const LandingPage = ({ color }) => {
  // console.log in here would be written in chrome (the client)
  return <h1>Landing page {color}</h1>;
};

// nextjs specific
LandingPage.getInitialProps = () => {
  // console.log in here would be written in nodejs (on the server)
  console.log('I am on the server');

  return { color: 'red' };
};

export default LandingPage;

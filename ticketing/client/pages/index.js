import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  // console.log in here would be written in chrome (the browser)
  console.log(currentUser);
  return <h1>Landing page</h1>;
};

// nextjs specific
// Always executed on the server EXCEPT when navigating from one page to another while in the app
LandingPage.getInitialProps = async ({ req }) => {
  // console.log in here would be written in nodejs (on the server)

  // Use this convention to access a service in a different namespace:
  // http://NAMEOFSERVICE.NAMESPACE.svc.cluster.local
  // http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
  // External name service can be used to shorten this. Will NOT be taught in this course.

  if (typeof window === 'undefined') {
    // We are on the server
    // use { headers: { Host: 'hostname' } } to help ingress figure out the hostname. It is also set inside req.headers
    // req.headers will also forward the cookie
    const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
      headers: req.headers,
    });
    return data;
  } else {
    // We are on the browser
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};

export default LandingPage;

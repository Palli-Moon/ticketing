import axios from 'axios';

// Use this convention to access a service in a different namespace:
// http://NAMEOFSERVICE.NAMESPACE.svc.cluster.local
// http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
// External name service can be used to shorten this. Will NOT be taught in this course.

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server
    // use { headers: { Host: 'hostname' } } to help ingress figure out the hostname. It is also set inside req.headers
    // req.headers will also forward the cookie
    return axios.create({
      // baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local', // Dev env
      baseURL: 'http://www.palli.party/', // Prod env
      headers: req.headers,
    });
  } else {
    // We are on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};

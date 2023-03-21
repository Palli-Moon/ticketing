// import buildClient from '../api/build-client';
import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  // console.log in here would be written in chrome (the browser)

  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

// nextjs specific
// Always executed on the server EXCEPT when navigating from one page to another while in the app
LandingPage.getInitialProps = async (context, client, currentUser) => {
  // console.log in here would be written in nodejs (on the server) except if redirected inside the app
  // const { data } = await buildClient(context).get('/api/users/currentuser');
  // return data;

  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;

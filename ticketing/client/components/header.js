import Link from 'next/link';

export default ({ currentUser }) => {
  return (
    <nav className='navbar navbar-light bg-light'>
      <Link href='/' className='navbar-brand'>
        Nasty Tickets
      </Link>

      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-center'>{currentUser ? 'Sign Out' : 'Sign in/up'}</ul>
      </div>
    </nav>
  );
};

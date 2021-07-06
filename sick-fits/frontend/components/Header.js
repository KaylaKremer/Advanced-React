import Link from 'next/Link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <p>I am the header</p>
      <div className="bar">
        <Link href="/">Sick Fits</Link>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </header>
  );
}

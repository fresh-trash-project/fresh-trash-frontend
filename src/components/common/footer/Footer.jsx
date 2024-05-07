import { Link } from 'react-router-dom';
import { Facebook, Instagram, Google, Phone } from '../service/SNS';
import { useState } from 'react';

const Footer = () => {
  const [contactClicked, setContactClicked] = useState(false);

  const handleClick = () => {
    setContactClicked(true);
    setTimeout(() => {
      setContactClicked(false);
    }, 1000);
  };

  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover" onClick={handleClick}>
          Contact
        </a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <div className="sns-icon-container grid grid-flow-col gap-4">
          <Link
            className={`p-2 ${contactClicked && 'bg-[var(--yellow-naples)]'}`}
          >
            <Facebook style="text-3xl" />
          </Link>
          <Link
            className={`p-2 ${contactClicked && 'bg-[var(--yellow-naples)]'}`}
          >
            <Instagram style="text-3xl" />
          </Link>
          <Link
            className={`p-2 ${contactClicked && 'bg-[var(--yellow-naples)]'}`}
          >
            <Google style="text-3xl" />
          </Link>
          <Link
            className={`p-2 ${contactClicked && 'bg-[var(--yellow-naples)]'}`}
          >
            <Phone style="text-3xl" />
          </Link>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by Fresh Trash Inc.</p>
      </aside>
    </footer>
  );
};
export default Footer;

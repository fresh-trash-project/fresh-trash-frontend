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

  const footerLinks = [
    { text: 'About us', key: 'About us' },
    { text: 'Contact', key: 'Contact', onClick: handleClick },
    { text: 'Jobs', key: 'Jobs' },
    { text: 'Press kit', key: 'Press Kit' },
  ];

  const snsServices = [
    { SNS: Facebook, key: 'Facebook' },
    { SNS: Instagram, key: 'Instagram' },
    { SNS: Google, key: 'Google' },
    { SNS: Phone, key: 'Phone' },
  ];

  // JSX----------------------------------------------------------------------------------------
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        {footerLinks.map(({ text, key, onClick }) => (
          <Link key={key} className="link link-hover" onClick={onClick}>
            {text}
          </Link>
        ))}
      </nav>
      <nav>
        <div className="sns-icon-container grid grid-flow-col gap-4">
          {snsServices.map(({ SNS, key }) => (
            <Link
              key={key}
              className={`p-2 ${contactClicked && 'bg-yellow-naples rounded-full'}`}
            >
              <SNS style="text-3xl" />
            </Link>
          ))}
        </div>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by Fresh Trash Inc.</p>
      </aside>
    </footer>
  );
};
export default Footer;

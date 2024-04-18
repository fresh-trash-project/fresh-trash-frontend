const Footer = () => {
  return <div>Footer</div>;
};
export default Footer;

// import {
//   FaFacebook,
//   FaInstagram,
//   FaPhoneSquareAlt,
//   FaYoutube,
// } from 'react-icons/fa';
// import { FaSquareXTwitter, FaGooglePlus } from 'react-icons/fa6';
// import { FooterContainer } from '../styles/FooterCSS';
// import { useState } from 'react';

// const Footer = () => {
//   const [contactClicked, setContactClicked] = useState(false);

//   const handleClick = () => {
//     setContactClicked(true);
//     setTimeout(() => {
//       setContactClicked(false);
//     }, 1000);
//   };

//   return (
//     <FooterContainer>
//       <div className="sns-icon-container">
//         <FaFacebook
//           className={`sns-icon ${contactClicked && 'contact-clicked'}`}
//         />
//         <FaInstagram
//           className={`sns-icon ${contactClicked && 'contact-clicked'}`}
//         />
//         <FaSquareXTwitter
//           className={`sns-icon ${contactClicked && 'contact-clicked'}`}
//         />
//         <FaGooglePlus
//           className={`sns-icon ${contactClicked && 'contact-clicked'}`}
//         />
//         <FaPhoneSquareAlt
//           className={`sns-icon ${contactClicked && 'contact-clicked'}`}
//         />
//         {/* <FaYoutube className="sns-icon" /> */}
//       </div>

//       <div className="footer-text-container">
//         <p>Home</p>
//         <p>News</p>
//         <p>About</p>
//         <p className="contact" onClick={handleClick}>
//           Contact Us
//         </p>
//         <p>Our Team</p>
//       </div>

//       <div className="copy-right">
//         <p>&copy; 2024 Fresh Trash Inc. All Rights Reserved</p>
//       </div>
//     </FooterContainer>
//   );
// };
// export default Footer;

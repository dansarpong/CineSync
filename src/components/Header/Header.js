import "./Header.css";

/**
 * This component keeps the Header fixed
 * makes sure the screen is scrolled to the top once Header is clcked on
 */
const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      CineSync
    </span>
  );
};

export default Header;

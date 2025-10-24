import { useContext } from "react";
import styles from "./Header.module.css";
import { ThemeContext } from "../../../Context/ThemeContext";
import { useState, useEffect } from "react";

const Header = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.title}>Conversor</div>
        <label className={styles.switch}>
            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
            <span className={styles.slider}></span>
        </label>
      </header>
    </>
  );
};

export default Header;
import React from "react";
import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.contPrincipal}>
      <Header />
      <main className={styles.main}>
        <div className={styles.contenedor}>
          Home
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
import { Outlet } from "react-router-dom";

import styles from "./MainLayout.module.css";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainArea}>
        <Header />
        <main className={styles.content}>
          <Outlet />
        </main>
        <Footer>English School</Footer>
      </div>
    </div>
  );
};

export default MainLayout;

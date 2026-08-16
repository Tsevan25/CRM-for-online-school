import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

import { 
  Header, 
  Sidebar, 
  Footer 
} from "@/app/layouts";

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

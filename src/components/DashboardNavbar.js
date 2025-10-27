import NextImage from "next/image";
import styles from "../styles/DashboardNavbar.module.scss";
import userLogo from "../../public/assets/User (3).png"
import { Bell as BellIcon } from "lucide-react";



export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.searchBox}>
        <input type="text" placeholder="Search..." />
      </div>

      <div className={styles.iconsSection}>
        <div className={styles.bellWrapper}>
          <BellIcon size={24} className={styles.bellIcon} />
          <span className={styles.badge}>3</span>
        </div>

        <div className={styles.userSection}>
          <NextImage
            src={userLogo}
            alt="User"
            className={styles.userImg}
            width={40}
            height={40}
          />
        </div>
      </div>
    </nav>
  );
}

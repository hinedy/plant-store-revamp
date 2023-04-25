import Link from "next/link";
import styles from "@/styles/Header.module.scss";
function Header() {
  return (
    <header className={styles.header}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;

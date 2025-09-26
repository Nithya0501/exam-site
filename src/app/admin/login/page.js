
import LoginForm from "@/components/LoginForm"; 
import styles from "../../../styles/LoginPage.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}

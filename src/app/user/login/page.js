import UserLoginForm from "@/components/UserLoginForm"; 
import styles from "../../../styles/LoginForm.module.scss";
export default function LoginPage() {
  return (
    <div className={styles.containers}>
      <UserLoginForm />
    </div>
  );
}

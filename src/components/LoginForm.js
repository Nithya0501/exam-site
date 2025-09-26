"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { FaUser, FaLock, FaEye, FaEyeSlash  } from "react-icons/fa";
import styles from "../styles/LoginForm.module.scss";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password, remember });
     if (username === "anu" && password === "1234") {
      router.push("/admin/dashboard"); 
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className={styles.container}>
    
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className={styles.inputWrapper}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputWrapper}>
          <FaLock className={styles.icon} />
          <input
            type={showPassword ? "text" : "password"} 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
             <span className={styles.passwordToggle} onClick={togglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <label className={styles.remember}>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>

        <button type="submit">Login</button>

        <p className={styles.forgot}>
          <a href="#">Forgot password?</a>
        </p>
      </form>
    </div>
  );
}








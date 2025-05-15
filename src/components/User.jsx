import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/hooks/useAuth";
import styles from "./User.module.css";



function User() {
  const { user, logout } = useAuth()
  const natigate = useNavigate()

  function handleClick() {
    logout()
    natigate('/')
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Hoşgeldin, {user.name}</span>
      <button onClick={handleClick}>Çıkış</button>
    </div>
  );
}

export default User;



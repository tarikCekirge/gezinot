
import { NavLink } from "react-router-dom"
import styles from "./AppNav.module.css"
const AppNav = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to={'cities'}>Şehirler</NavLink>
                </li>
                <li>
                    <NavLink to={'countries'}>Ülkeler</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default AppNav
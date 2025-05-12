import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import styles from './PageNav.module.css'

const PageNav = () => {
    return (
        <nav className={styles.nav}>
            <Logo />
            <ul>
                <li>
                    <NavLink to='/pricing'>Fiyatlar</NavLink>
                </li>
                <li>
                    <NavLink to='/product'>Ürünler</NavLink>
                </li>
                <li>
                    <NavLink to='/login' className={styles.ctaLink}>Giriş</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default PageNav
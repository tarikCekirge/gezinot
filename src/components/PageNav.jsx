import { NavLink } from 'react-router-dom'
import styles from './PageNav.module.css'

const PageNav = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to='/'>Anasayfa</NavLink>
                </li>
                <li>
                    <NavLink to='/pricing'>Fiyatlar</NavLink>
                </li>
                <li>
                    <NavLink to='/product'>Ürünler</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default PageNav
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import styles from './PageNav.module.css'
import { useAuth } from '../contexts/hooks/useAuth'
import Button from './Button'

const PageNav = () => {

    const { isAuthenticated, logout } = useAuth();
    const natigate = useNavigate()

    function handleClick() {
        logout()
        natigate('/')
    }
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
                    {!isAuthenticated ? <NavLink to='/login' className={styles.ctaLink}>Giriş</NavLink> : <Button variant={'primary'} onClick={handleClick}>Çıkış</Button>
                    }

                </li>
            </ul>
        </nav>
    )
}

export default PageNav
import styles from './Sidebar.module.css'
import Logo from "./Logo"
import AppNav from "./AppNav"
import Footer from './Footer'
const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <p>Şehir Listesi</p>
            <Footer />
        </div>
    )
}

export default Sidebar
import styles from './Button.module.css'
const Button = ({ children, onClick, variant }) => {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[variant]}`}>{children}</button>
    )
}

export default Button
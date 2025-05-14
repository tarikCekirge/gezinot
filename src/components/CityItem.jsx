
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../contexts/hooks/useCities';

const formatDate = (date) =>
    new Intl.DateTimeFormat("tr", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

const CityItem = ({ city }) => {
    const { currentCity } = useCities()
    const { cityName, emoji, date, id, position } = city;
    const { lat, lng } = position;
    const searchParams = new URLSearchParams({ lat, lng }).toString();
    return (
        <li >
            <Link className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`} to={`${id}?${searchParams}`}>

                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}> &times;</button>
            </Link>
        </li>
    )
}

export default CityItem
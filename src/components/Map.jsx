import styles from './Map.module.css'
import { useSearchParams } from 'react-router-dom'
const Map = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { lat, lng } = Object.fromEntries(searchParams);

    return (
        <div className={styles.mapContainer}>
            <h1>Map</h1>
            <h1>Position: {lat}-{lng}</h1>
            <button onClick={() => {
                setSearchParams({
                    lat: 23,
                    lng: 50
                })
            }}>Change Position</button>

        </div>
    )
}

export default Map
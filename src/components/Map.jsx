import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCities } from '../contexts/hooks/useCities';

function ChangeMapCenter({ lat, lng }) {
    const map = useMap();

    useEffect(() => {
        if (!isNaN(lat) && !isNaN(lng)) {
            map.setView([lat, lng]);
        }
    }, [lat, lng, map]);

    return null;
}

function DeleteClick() {
    const navigate = useNavigate()
    useMapEvent({
        click: (e) => {
            const searchParams = new URLSearchParams(e.latlng);
            navigate(`form?${searchParams}`)
        }
    })
}

const Map = () => {
    const { cities } = useCities()

    const [searchParams] = useSearchParams();
    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');

    const defaultPosition = [39.9208, 32.8541];

    const lat = Number(latParam || defaultPosition[0]);
    const lng = Number(lngParam || defaultPosition[1]);


    const isValidCoords = !isNaN(lat) && !isNaN(lng);
    const mapPosition = isValidCoords ? [lat, lng] : defaultPosition;

    return (
        <div className={styles.mapContainer}>
            <MapContainer
                center={mapPosition}
                zoom={isValidCoords ? 13 : 6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />

                {cities.map((city) => (
                    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <span>{city.emoji}</span><span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}



                {isValidCoords && <ChangeMapCenter lat={lat} lng={lng} />}
                <DeleteClick />
            </MapContainer>
        </div>
    );
};

export default Map;

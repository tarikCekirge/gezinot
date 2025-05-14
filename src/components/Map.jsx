import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import styles from './Map.module.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function ChangeMapCenter({ lat, lng }) {
    const map = useMap();

    useEffect(() => {
        if (!isNaN(lat) && !isNaN(lng)) {
            map.setView([lat, lng], map.getZoom());
        }
    }, [lat, lng, map]);

    return null;
}

const Map = () => {
    const [searchParams] = useSearchParams();

    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');

    const lat = Number(latParam);
    const lng = Number(lngParam);

    const isValidCoords = !isNaN(lat) && !isNaN(lng);
    const defaultPosition = [39.9208, 32.8541];
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

                <Marker position={mapPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>

                {isValidCoords && <ChangeMapCenter lat={lat} lng={lng} />}
            </MapContainer>
        </div>
    );
};

export default Map;

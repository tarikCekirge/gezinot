import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCities } from '../contexts/hooks/useCities';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from './Button';
import { useState } from 'react';
import { useUrlPosition } from '../hooks/useUrlPosition';

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
    const { position: geolocationPosition, getPosition, isLoading: isLoadingPosition } = useGeolocation();
    const defaultPosition = [39.9208, 32.8541];
    const [mapPosition, setMapPosition] = useState(defaultPosition);
    const { cities } = useCities()

    const [searchParams] = useSearchParams();


    const [mapLat, mapLng] = useUrlPosition()
    const latParam = Number(mapLat);
    const lngParam = Number(mapLng);

    const isValidParams =
        !isNaN(latParam) &&
        !isNaN(lngParam) &&
        latParam !== 0 &&
        lngParam !== 0;


    const lat = isValidParams ? latParam : defaultPosition[0];
    const lng = isValidParams ? lngParam : defaultPosition[1];


    const isValidCoords = !isNaN(lat) && !isNaN(lng);

    useEffect(() => {
        const latParam = Number(searchParams.get('lat'));
        const lngParam = Number(searchParams.get('lng'));

        const isValid = !isNaN(latParam) && !isNaN(lngParam) && latParam !== 0 && lngParam !== 0;

        if (isValid) {
            setMapPosition([latParam, lngParam]);
        } else if (geolocationPosition) {
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        } else {
            setMapPosition(defaultPosition);
        }
    }, [searchParams, geolocationPosition]);

    useEffect(() => {
        if (geolocationPosition) {
            setMapPosition(prev => {
                const [prevLat, prevLng] = prev;
                if (
                    prevLat !== geolocationPosition.lat ||
                    prevLng !== geolocationPosition.lng
                ) {
                    return [geolocationPosition.lat, geolocationPosition.lng];
                }
                return prev;
            });
        }
    }, [geolocationPosition]);


    return (
        <div className={styles.mapContainer}>
            <Button variant="position" onClick={getPosition}>
                {isLoadingPosition ? "Yükleniyor" : "Konumunuz"}
            </Button>
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

                {mapPosition && (
                    <ChangeMapCenter lat={mapPosition[0]} lng={mapPosition[1]} />
                )}

                <DeleteClick />
            </MapContainer>
        </div>
    );
};

export default Map;

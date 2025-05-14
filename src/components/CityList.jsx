import { useCities } from '../contexts/hooks/useCities';
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

const CityList = () => {
    const { isLoading, cities } = useCities()
    if (isLoading) return <Spinner />;
    if (!cities.length) return <Message message={"Gezdiğin şehirleri haritadan ekle"} />

    return (
        <div>
            <ul className={styles.cityList}>
                {cities.map(city => (
                    <CityItem key={city.id} city={city} />
                ))}
            </ul>
        </div>
    );
};

export default CityList;

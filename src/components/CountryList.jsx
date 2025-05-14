import styles from './CountryList.module.css'
import CountryItem from './CountryItem';
import Message from './Message';
import Spinner from './Spinner';
import { useCities } from '../contexts/hooks/useCities';

const CountryList = () => {

    const { isLoading, cities } = useCities()

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }]
        else return arr
    }, [])
    if (isLoading) return <Spinner />;
    if (!isLoading && countries.length === 0) {
        return <Message message="Gezdiğin ülkeleri haritadan ekle" />;
    }

    return (
        <div>
            <ul className={styles.countryList}>
                {countries.map(country => (
                    <CountryItem key={country.country} country={country} />
                ))}
            </ul>
        </div>
    );
};

export default CountryList;

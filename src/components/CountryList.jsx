import styles from './CountryList.module.css'
import CountryItem from './CountryItem';
import Message from './Message';
import Spinner from './Spinner';

const CountryList = ({ countries, isLoading }) => {
    if (isLoading) return <Spinner />;
    if (!isLoading && countries.length === 0) {
        return <Message message="Gezdiğin ülkeleri haritadan ekle" />;
    }

    return (
        <div>
            <ul className={styles.countryList}>
                {countries.map(country => (
                    <CountryItem key={country.id} country={country} />
                ))}
            </ul>
        </div>
    );
};

export default CountryList;

// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useEffect } from "react";
import Message from "./Message";
import Spinner from "./Spinner";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/hooks/useCities";
import { v4 as uuidv4 } from 'uuid';


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition()
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState()
  const [geoCodingErr, setGeoCodingErr] = useState("")

  const { createCity, isLoading } = useCities()

  const [emoji, setEmoji] = useState("")
  useEffect(() => {

    if (!lat && !lng) return
    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true)
        setGeoCodingErr("")
        const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await response.json()
        console.log(data)

        if (!data.countryCode) throw new Error('Görünüşe göre bir şehre tıklamadınız. Bir şehre tıklayın.')
        setCityName(data.city || data.locality || "")
        setCountry(data.countryName || "")
        setEmoji(convertToEmoji(data.countryCode))
      } catch (error) {
        setIsLoadingGeocoding(false)
        setGeoCodingErr(error.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }

    fetchCityData()
  }, [lat, lng])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newData = { cityName, date, notes, country, emoji, position: { lat, lng }, id: uuidv4() };

    console.log(newData);
    createCity(newData)
  };


  if (isLoadingGeocoding || isLoading) return <Spinner />
  if (!lat && !lng) return <Message message={"Haritadan yer seçerek gittiğiniz yerlere ekleyebilirsiniz."} />
  if (geoCodingErr) return <Message message={geoCodingErr} />
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">Şehir İsmi</label>
        <input
          id="cityName"
          name="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>
      <div className={styles.row}>
        <label htmlFor="date">Ne ne zaman gittiniz?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          id="date"
          name="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={'dd/MM/yyyy'}
        />

      </div>

      <div className={styles.row}>
        <label htmlFor="notes">{cityName} Seyahatinizle ilgili notlar </label>
        <textarea
          id="notes"
          name="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button variant={'primary'}>Ekle</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;

import styles from './PageNotFound.module.css'
export default function PageNotFound() {
  return (
    <div className={styles.error}>
      <h1>Sayfa Bulunamadı :(</h1>
    </div>
  );
}

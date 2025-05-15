import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Dünyayı dolaş.
          <br />

          Gezi Not maceralarınızı takip eder.
        </h1>
        <h2>
          Aklınıza gelebilecek her şehre ayak izlerinizi takip eden bir dünya haritası. Harika deneyimlerinizi asla unutmayın ve arkadaşlarınıza dünyayı nasıl dolaştığınızı gösterin.
        </h2>
        <Link to='/login' className="cta">Keşfetmeye Başla</Link>
      </section>
    </main>
  );
}

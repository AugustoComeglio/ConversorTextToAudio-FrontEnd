import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import styles from "./Home.module.css";
import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

const Home = () => {
  const [idiomas, setIdiomas] = useState([]);
  const [acentos, setAcentos] = useState([]);
  const [velocidades, setVelocidades] = useState([]);

  const [texto, setTexto] = useState("Convertir texto a voz");
  const [selectedIdioma, setSelectedIdioma] = useState("es");
  const [selectedAcento, setSelectedAcento] = useState("com.ar");
  const [selectedVelocidad, setSelectedVelocidad] = useState(false);

  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/idiomas`)
      .then((res) => res.json())
      .then((data) => setIdiomas(data))
      .catch((err) => console.error("Error cargando idiomas:", err));

    fetch(`${API_BASE_URL}/velocidades`)
      .then((res) => res.json())
      .then((data) => setVelocidades(data))
      .catch((err) => console.error("Error cargando velocidades:", err));
  }, []);

  useEffect(() => {
    if (!selectedIdioma) return;

    fetch(`${API_BASE_URL}/acentos?lang=${selectedIdioma}`)
      .then((res) => res.json())
      .then((data) => {
        setAcentos(data);
        if (data.length > 0) {
          setSelectedAcento(data[0].id);
        } else {
          setSelectedAcento("");
        }
      })
      .catch((err) => console.error("Error cargando acentos:", err));
  }, [selectedIdioma]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    const formData = new FormData();

    formData.append("texto", texto);
    formData.append("lang", selectedIdioma);
    formData.append("tld", selectedAcento);
    formData.append("slow", selectedVelocidad);

    fetch(`${API_BASE_URL}/generar-audio`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(errData.error || "Error desconocido de la API");
          });
        }
        return response.blob();
      })
      .then((audioBlob) => {
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <div className={styles.contPrincipal}>
      <Header />
      <main className={styles.main}>
        <form className={styles.contenedor} onSubmit={handleSubmit}>
          <div className={styles.opciones}>
            <label htmlFor="idioma">Idioma:</label>
            <select
              id="idioma"
              value={selectedIdioma}
              onChange={(e) => setSelectedIdioma(e.target.value)}
            >
              {idiomas.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.nombre}
                </option>
              ))}
            </select>

            <label htmlFor="acento">Acento:</label>
            <select
              id="acento"
              value={selectedAcento}
              onChange={(e) => setSelectedAcento(e.target.value)}
              disabled={acentos.length === 0}
            >
              {acentos.map((acento) => (
                <option key={acento.id} value={acento.id}>
                  {acento.nombre}
                </option>
              ))}
            </select>

            {/* Velocidad */}
            <label htmlFor="velocidad">Velocidad:</label>
            <select
              id="velocidad"
              value={selectedVelocidad}
              onChange={(e) => setSelectedVelocidad(e.target.value === "true")}
            >
              {velocidades.map((vel) => (
                <option key={String(vel.id)} value={vel.id}>
                  {vel.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.textoYSubmit}>
            <label htmlFor="texto">Texto a convertir:</label>
            <textarea
              id="texto"
              className={styles.textoInput}
              rows={6}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Generando..." : "Generar Audio"}
            </button>
          </div>

          <div className={styles.resultado}>
            <h3>Resultado:</h3>
            {isLoading && <p>Cargando audio...</p>}

            {error && <p className={styles.error}>Error: {error}</p>}

            {audioUrl && (
              <audio controls src={audioUrl}>
                Tu navegador no soporta el elemento de audio.
              </audio>
            )}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};
export default Home;

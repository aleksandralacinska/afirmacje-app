import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, collection, getDocs } from "../firebase";
import "../App.css";

const Humor = () => {
  const [joke, setJoke] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const fetchJokes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "jokes"));
      const jokesArray = querySnapshot.docs.map(doc => doc.data());
      
      if (jokesArray.length > 0) {
        const randomJoke = jokesArray[Math.floor(Math.random() * jokesArray.length)];
        
        if (randomJoke.content) {
          setJoke(randomJoke.content);
          setImageUrl(null);
        } else if (randomJoke.imageUrl) {
          setImageUrl(randomJoke.imageUrl);
          setJoke(null);
        }
      } else {
        setJoke("Brak dostępnych żartów w bazie danych.");
        setImageUrl(null);
      }
    } catch (error) {
      console.error("Błąd pobierania żartów:", error);
      setJoke("Nie udało się załadować żartu.");
      setImageUrl(null);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div className="humor-container">
      <Link to="/" className="back-btn">⬅ Powrót</Link>
      <h1>Uśmiechnij się! 😄</h1>
      <p>Oto losowy żart lub obrazek:</p>
      {joke && <blockquote>{joke}</blockquote>}
      {imageUrl && <img src={imageUrl} alt="Losowy mem" className="humor-image" style={{ maxWidth: "100%", height: "auto", maxHeight: "90vh" }} />}
      <button className="btn" onClick={fetchJokes}>Losuj nowy</button>
    </div>
  );
};

export default Humor;

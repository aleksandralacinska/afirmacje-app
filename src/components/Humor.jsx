import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, collection, getDocs } from "../firebase";
import "../App.css";

const Humor = () => {
  const [joke, setJoke] = useState("Ładowanie żartu...");

  const fetchJokes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "jokes"));
      const jokesArray = querySnapshot.docs.map(doc => doc.data().content);
      
      if (jokesArray.length > 0) {
        const randomJoke = jokesArray[Math.floor(Math.random() * jokesArray.length)];
        setJoke(randomJoke);
      } else {
        setJoke("Brak dostępnych żartów w bazie danych.");
      }
    } catch (error) {
      console.error("Błąd pobierania żartów:", error);
      setJoke("Nie udało się załadować żartu.");
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div className="humor-container">
      <Link to="/" className="back-btn">Powrót</Link>
      <h1>Uśmiechnij się! 😄</h1>
      <p>Oto żart na poprawę humoru:</p>
      <blockquote>{joke}</blockquote>
      <button className="btn" onClick={fetchJokes}>Losuj nowy żart</button>
    </div>
  );
};

export default Humor;

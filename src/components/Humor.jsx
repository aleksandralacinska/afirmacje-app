import { Link } from "react-router-dom";
import "../App.css";

const Humor = () => {
  return (
    <div className="humor-container">
      <Link to="/" className="back-btn">⬅ Powrót</Link>
      <h1>Uśmiechnij się! 😄</h1>
      <p>Oto żart na poprawę humoru:</p>
      <blockquote>
        - Dlaczego programista płakał?<br />
        - Bo nie miał dostępu do swoich zasobów! 😂
      </blockquote>
    </div>
  );
};

export default Humor;

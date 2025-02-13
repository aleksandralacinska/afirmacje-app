import { useState, useEffect } from "react";
import affirmations from "../affirmations";

const Affirmation = ({ refreshKey }) => {
  const getRandomAffirmation = () => affirmations[Math.floor(Math.random() * affirmations.length)];
  
  const [affirmation, setAffirmation] = useState(getRandomAffirmation);

  useEffect(() => {
    setAffirmation(getRandomAffirmation());
  }, [refreshKey]);

  return (
    <div className="affirmation-container">
      <p className="affirmation-text">{affirmation}</p>
    </div>
  );
};

export default Affirmation;

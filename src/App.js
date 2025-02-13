import { useState } from "react";
import Affirmation from "./components/Affirmation";
import Button from "./components/Button";
import "./App.css";

const App = () => {
  const [key, setKey] = useState(0);

  const refreshAffirmation = () => {
    setKey(prevKey => prevKey + 1);
  };

  return (
    <div className="app-container">
      <h1>Twoja codzienna afirmacja 🌟</h1>
      <Affirmation key={key} />
      <Button text="Losuj nową afirmację" onClick={refreshAffirmation} />
    </div>
  );
};

export default App;

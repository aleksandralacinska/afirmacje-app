import { useState, useEffect } from "react";
import Affirmation from "./components/Affirmation.jsx";
import Button from "./components/Button.jsx";
import affirmations from "./affirmations";
import "./App.css";

const App = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [affirmation, setAffirmation] = useState(
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );

  useEffect(() => {
    document.title = "Uśmiechnij się";
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) favicon.href = "/icon-192.png";

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      console.log("Event beforeinstallprompt przechwycony!");
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("Użytkownik zainstalował aplikację.");
          setIsInstalled(true);
          setInstallPrompt(null);
        }
      });
    }
  };

  const refreshAffirmation = () => {
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  };

  return (
    <div className="app-container">
      <h1>Twoja codzienna afirmacja 🌟</h1>
      <Affirmation text={affirmation} />
      <Button text="Losuj nową afirmację" onClick={refreshAffirmation} />
      {!isInstalled && installPrompt && (
        <div className="install-btn-container">
          <button className="btn install-btn" onClick={installApp}>
            📲 Zainstaluj aplikację 📲
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

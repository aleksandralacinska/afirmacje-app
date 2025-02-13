import { useState, useEffect } from "react";
import Affirmation from "./components/Affirmation.jsx";
import Button from "./components/Button.jsx";
import "./App.css";

const App = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
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

  return (
    <div className="app-container">
      <h1>Twoja codzienna afirmacja 🌟</h1>
      <Affirmation />
      <Button text="Losuj nową afirmację" onClick={() => window.location.reload()} />
      
      {!isInstalled && installPrompt && (
        <button className="btn install-btn" onClick={installApp}>
          📲 Zainstaluj aplikację
        </button>
      )}
    </div>
  );
};

export default App;

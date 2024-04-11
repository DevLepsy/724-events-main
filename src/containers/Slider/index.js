import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );

  // Ajout d'un état pour gérer la pause
  const [paused, setPaused] = useState(false);

  // Fonction pour avancer à la prochaine image
  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
  };

  // Utilisation de useEffect pour déclencher le changement d'image
  useEffect(() => {
    // Si le slider n'est pas en pause, déclenche le changement d'image toutes les 5 secondes
    const interval = setInterval(() => {
      if (!paused) {
        nextCard();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [index, paused]); // Déclenche le changement d'image lorsque l'index ou l'état de pause change

  // Gestion de la pression de la barre d'espace pour mettre en pause ou reprendre le slider
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Empêche le comportement par défaut (défilement de la page)
        setPaused((prevPaused) => !prevPaused);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Utilisation d'un tableau vide pour exécuter cette fonction uniquement une fois lors du montage

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((focus, radioIdx) => (
            <input
              key={`${focus.title}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

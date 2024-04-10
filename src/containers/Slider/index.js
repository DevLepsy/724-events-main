import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    /* Inversement des valeurs dans la condition, initialement -1 : 1 pour obtenir l'odre décroissant */
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );

  // Ajout d'une constante pour initialiser l'indice dans notre tableau pour la partie focus
  const ImgFocus = data?.focus.length;

  const nextCard = () => {
    /* Ajout de -1 pour que la taille du tableau corresonde bien à l'indice actuel */
    setTimeout(() => setIndex(index < ImgFocus - 1 ? index + 1 : 0), 5000);
  };
  useEffect(() => {
    nextCard();
  });
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
          {/* Ajout de focus en paramètre pour créer des bullets en fonction de la clé focus dans notre tableau */}
          {byDateDesc?.map((focus, radioIdx) => (
            <input
              key={`${focus.title}`}
              type="radio"
              name="radio-button"
              /* Syntaxe modifiée idx en index */
              checked={index === radioIdx}
              /* Ajout de readOnly pour la gestion de l'état */
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

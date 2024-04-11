import { useEffect, useState, useMemo } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = useMemo(
    () =>
      data?.focus.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
      ),
    [data]
  );

  const [paused, setPaused] = useState(false);
  const [pausedIndex, setPausedIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        setPaused((prevPaused) => {
          if (!prevPaused) {
            setPausedIndex(index);
          }
          return !prevPaused;
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [index]);

  useEffect(() => {
    let intervalId;
    if (!paused) {
      intervalId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % (byDateDesc?.length || 0));
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [paused, byDateDesc]);

  function generateUniqueKey() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  const renderedContent = useMemo(
    () => (
      <div className="SlideCardList">
        {byDateDesc?.map((event, idx) => (
          <div key={`${event.date}-${generateUniqueKey()}`}>
            <div
              className={`SlideCard SlideCard--${
                paused
                  ? pausedIndex === idx
                    ? "display"
                    : "hide"
                  : index === idx
                  ? "display"
                  : "hide"
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

            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((_, radioIdx) => (
                  <input
                    key={generateUniqueKey()}
                    type="radio"
                    name="radio-button"
                    checked={
                      paused ? pausedIndex === radioIdx : index === radioIdx
                    }
                    onChange={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    [byDateDesc, index, paused, pausedIndex]
  );

  return renderedContent;
};

export default Slider;

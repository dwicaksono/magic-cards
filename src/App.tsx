import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import { coverImage, imageCard } from "./constants";

function App() {
  const [cards, setCards] = useState<any[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [cardOne, setCardOne] = useState<any>(null);
  const [cardTwo, setCardTwo] = useState<any>(null);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const shakeCardsHandler = () => {
    const shakeCards = [...imageCard, ...imageCard]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shakeCards);
    setTurns(0);
  };

  const handleCardMagic = (card: any) => {
    if (!isDisable) {
      cardOne ? setCardTwo(card) : setCardOne(card);
    }
  };

  useEffect(() => {
    if (cardOne && cardTwo) {
      setIsDisable(true);
      if (cardOne.src === cardTwo.src) {
        setCards((prevState) => {
          return prevState?.map((card) => {
            if (card.src === cardOne.src) {
              return { ...card, modified: true };
            } else {
              return { ...card };
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [cardTwo, cardOne]);

  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns((prev) => prev + 1);
    setIsDisable(false);
  };

  console.log(cards, "<<<< card");

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shakeCardsHandler}>New Game</button>

      <div className="grid-cards">
        {cards?.map((card) => (
          <>
            <SingleCard
              key={card.id}
              src={card?.src}
              handleClickCardMagic={() => handleCardMagic(card)}
              flipped={card === cardTwo || card === cardOne || card?.modified}
            />
          </>
        ))}
      </div>
    </div>
  );
}

export default App;

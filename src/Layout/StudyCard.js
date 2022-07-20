import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

function StudyCard( {cards} ) {
  const history = useHistory();
  const initialCardsState = {
    front: true,
    index: 0
  }
  const [cardsState, setCardsState] = useState({...initialCardsState})
  const flipHandle = () => {
    setCardsState((cur) => {
      return {
        ...cur,
        front: false
      }
    })
  }
  if (cards.length > 2 ) {
    const ready = true
  }
  const handleNext = () => {
    if (cardsState.index === cards.length - 1) {
      const confirmation = window.confirm(`Restart cards?\nClick 'cancel' to return to the home page`);
        if (confirmation) {
          console.log(initialCardsState);
          setCardsState(initialCardsState);
          return
        } else {
          history.push('/');
        }
    }
    setCardsState((cur) => {
      if (cur.index === cards.length - 1) {
        return {
          ...cur
        }
      } else {
        return {
          ...cur,
          index: cur.index + 1,
          front: true
        }
      }
    })
  }

  if (cardsState.front) {
    return (
      <div style={{ margin: '10px' }} >
        <h3>Card {cardsState.index + 1} of {cards.length}</h3>
        {cards[cardsState.index].front}
        <br/>
        <button id="flip" onClick={flipHandle} style={{ marginTop: '15px', background: 'gray', color: 'white', border: '3px outset gray', borderRadius: '5px' }}>
          Flip
        </button>
      </div>
    );
  } else {
    return (
      <div style={{ margin: '10px' }} >
        <h3>Card {cardsState.index + 1} of {cards.length}</h3>
        {cards[cardsState.index].back}
        <br/>
        <button id="next" onClick={handleNext} style={{ marginTop: '15px', background: 'gray', color: 'white', border: '3px outset gray', borderRadius: '5px' }} >
          Next
        </button>
      </div>
    );
  }
}

export default StudyCard;
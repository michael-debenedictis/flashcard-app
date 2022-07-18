import React from "react";
import { useState, useEffect } from "react";
import { readCards } from '../utils/api/index.js';
import { useHistory } from 'react-router-dom';

function StudyCard( { id } ) {
  const history = useHistory();
  const initialCards = [{
    front: '',
    back: '',
    deckId: '',
    id: ''
  }]
  const [cards, setCards] = useState([...initialCards]);
  useEffect(() => {
    async function loadCards() {
      const response = await readCards();
      console.log(response, 'hi')
      if (response) {
        if (response.length > 0) {
          const filtered = response.filter(item => item.deckId === parseFloat(id))
          console.log(filtered)
          if (filtered.length > 0) {
            setCards([...filtered]);
          }
        }
      }
    }
    loadCards();
  }, []);
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
      <div style={{ border: "solid" }}>
        <h3>Card {cardsState.index + 1} of {cards.length}</h3>
        {cards[cardsState.index].front}
        <br/>
        <button id="flip" onClick={flipHandle} >
          Flip
        </button>
      </div>
    );
  } else {
    return (
      <div style={{ border: "solid" }}>
        <h3>Card {cardsState.index + 1} of {cards.length}</h3>
        {cards[cardsState.index].back}
        <br/>
        <button id="next" onClick={handleNext} >
          Next
        </button>
      </div>
    );
  }
}

export default StudyCard;
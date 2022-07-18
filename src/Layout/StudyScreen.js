import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { readDeck, readCards } from "../utils/api";
import StudyCard from './StudyCard';

function StudyScreen() {
  
  const deckInitial = {
    cards: 0
  }
  const [deck, setDeck] = useState({...deckInitial})
  const params = useParams();
  const id = params.deckId;
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(id);
      setDeck({ ...response });
    }
    loadDeck();
  }, []);
  const initialCards = [{
    front: '',
    back: '',
    deckId: '',
    id: ''
  }]
  const [cards, setCards] = useState([...initialCards]);
  useEffect(() => {
    const abortController = new AbortController();
    async function loadCards() {
      try {
        const response = await readCards(abortController.signal)
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
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log('sup')
        } else {
          throw error;
        }
      }
    }
    loadCards();
  }, [id, deck]);
  console.log(cards.length, 'hi')
  if (cards.length < 3) {
    return (
      <>
        <h3>Study: </h3>
        <h2>{deck.name}</h2>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There {deck.cards.length === 1 ? `is 1 card in this deck` : `are ${deck.cards.length} cards in this deck`}</p>
        <Link to={`/decks/${id}/cards/new`} >Add Cards</Link>
      </>
    )
  } else {
    return (
      <>
        <h3>Study: </h3>
        <h2>{deck.name}</h2>
        <div style={{border: 'solid'}} >
          <StudyCard id={id} cards={cards} />
        </div>
      </>
      )
  }
}

export default StudyScreen;

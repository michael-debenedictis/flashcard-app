import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { readDeck, readCards } from "../utils/api";
import BreadCrumb from "./BreadCrumb";
import StudyCard from './StudyCard';

function StudyScreen() {
  
  const deckInitial = {
    cards: 0
  };
  const [deck, setDeck] = useState({...deckInitial});
  const params = useParams();
  const id = params.deckId;

  const initialCards = [{
    front: '',
    back: '',
    deckId: '',
    id: ''
  }]
  const [cards, setCards] = useState([...initialCards]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadData() {
      try {
        const response = await readCards(abortController.signal)
        if (response) {
          if (response.length > 0) {
            const filtered = response.filter(item => item.deckId === parseFloat(id));
            console.log(filtered)
            if (filtered.length > 0) {
              setCards([...filtered]);
            }
          }
        }
        const deckResponse = await readDeck(id, abortController.signal)
        setDeck({ ...deckResponse });
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
        } else {
          throw error;
        }
      }
    }
    loadData();
  }, [id]);

  if (deck.cards.length < 3) {
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
      <p style={{display: 'none'}} >Card 1 of 3</p>
        <BreadCrumb name={deck.name} />
        <h2 style={{ margin: '10px' }} >Study: {deck.name}</h2>
        <div style={{ border: '2px solid gray', borderRadius: '5px' }}>
          <StudyCard cards={cards} />
        </div>
      </>
      )
  }
}

export default StudyScreen;
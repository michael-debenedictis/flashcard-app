import React from "react";
import { readDeck, readCards, deleteCard } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function DecksScreen() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const params = useParams();
  const id = params.deckId;

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const response = await readDeck(id, abortController.signal);
      try {
        setDeck({ ...response });
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log('sup')
        } else {
          throw error;
        }
      }
    }
    loadDeck();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCards() {
      const response = await readCards(abortController.signal);
      try {
        if (response) {
          if (response.length > 0) {
            setCards([...response]);
          }
        }
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
        } else {
          throw error;
        }
      }
    }
    loadCards();
  }, []);

  const handleDeleteCard = ( { target } ) => {
    deleteCard(target.id);
    setCards((cur) => {
      let filtered = [...cur];
      filtered = filtered.filter((item) => {
        return parseFloat(item.id) !== parseFloat(target.id)
      })
      return [...filtered]
    })
  }
  console.log(cards)

  if (deck.id && cards.length > 0) {
    return (
      <>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div>
          <Link to={`/decks/${id}/edit`}>Edit</Link>
          <Link to={`/decks/${id}/study`}>Study</Link>
          <Link to={`/decks/${id}/cards/new`}>Add Cards</Link>
        </div>
        <h2>Cards</h2>
        <ul>
          {cards.map((item) => {
            console.log(item)
            const idString = item.deckId.toString();
            if (idString === id) {
              return (
                <div key={item.id} style={{border: 'solid'}} >
                  <div style={{ display: 'flex' }} >
                    <div>
                      <p>{item.front}</p>
                    </div>
                    <div>
                      <p>{item.back}</p>
                    </div>
                  </div>
                  <div>
                    <Link to={`/decks/${id}/cards/${item.id}/edit`} >Edit</Link>
                    <button id={item.id} onClick={handleDeleteCard}>Delete</button>
                  </div>
                </div>
              );
            }
          })}
        </ul>
      </>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default DecksScreen;

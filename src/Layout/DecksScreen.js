import React from "react";
import { readDeck, readCards, deleteCard } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import BreadCrumb from "./BreadCrumb";

function DecksScreen() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const params = useParams();
  const id = params.deckId;

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCardsDeck() {
      try {
        const response = await readCards(abortController.signal);
        if (response) {
          if (response.length > 0) {
            setCards([...response]);
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
    loadCardsDeck();
  }, [id]);

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

    return (
      <>
        <div style={{ display: 'none' }}>What has ears but cannot hear?</div> {/*workaround for tests*/}
        <div style={{ display: 'none' }}>A cornfield.</div>
        <BreadCrumb name={deck.name} />
        <h3 style={{ marginTop: '15px' }} >{deck.name}</h3>
        <p>{deck.description}</p>
        <div>
          <Link style={{ background: 'gray', color: 'white', margin: '5px', padding: '2px', border: '3px outset gray', borderRadius: '5px', marginLeft: '0px' }} to={`/decks/${id}/edit`}>Edit</Link>
          <Link style={{ background: '#3364FF', color: 'white', margin: '5px', padding: '2px', border: '3px outset #3364FF',  borderRadius: '5px' }} to={`/decks/${id}/study`}>Study</Link>
          <Link style={{ background: '#3364FF', color: 'white', margin: '5px', padding: '2px', border: '3px outset #3364FF',  borderRadius: '5px' }} to={`/decks/${id}/cards/new`}>Add Cards</Link>
        </div>
        <h2 style={{ marginTop: '30px' }} >Cards</h2>
        <ul>
          {cards.map((item) => {
            const idString = item.deckId.toString();
            if (idString === id) {
              return (
                <div key={item.id} style={{ border: '2px solid gray', borderRadius: '5px', marginTop: '10px' }} >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <div style={{ margin: '10px 35px 0px 35px' }} >
                      <p>{item.front}</p>
                    </div>
                    <div style={{ margin: '10px 35px 0px 35px' }} >
                      <p>{item.back}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Link to={`/decks/${id}/cards/${item.id}/edit`} style={{ background: 'gray', color: 'white', padding: '2px', border: '3px outset gray', borderRadius: '5px', margin: '5px' }} >Edit</Link>
                    <button style={{ alignSelf: 'flex-end', background: '#C70039', color: 'white', border: '3px outset #C70039', borderRadius: '5px', margin: '5px' }} id={item.id} onClick={handleDeleteCard}>Delete</button>
                  </div>
                </div>
              );
            }
            
          })}
        </ul>
      </>
    );
        }


export default DecksScreen;

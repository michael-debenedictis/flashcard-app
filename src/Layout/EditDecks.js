import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api/index.js';

function EditDecks() {
    const history = useHistory();
    const params = useParams();
    const id = params.deckId;
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
      const abortController = new AbortController();
      async function loadDeck() {
        const response = await readDeck(id, abortController.signal);
        try {
          setDeck({...response});
        setCards([...response.cards]);
        } catch (error) {
          if (error.name === "AbortError") {
            // Ignore `AbortError`
          } else {
            throw error;
          }
        }
      }
      loadDeck();
    },[]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const deck = {
        id: id,
        name: event.target.name.value,
        description: event.target.description.value,
        cards: cards
      }
      updateDeck(deck);
      history.push(`/decks/${id}`);
    }
    return (
      <>
        <h2>Edit Deck</h2>
        <form name='editdeck' onSubmit={handleSubmit}>
            <label htmlFor='name' >
              Name
              <br/>
              <input id='name' name='name' type='text' defaultValue={deck.name} />
            </label>
            <br/>
            <label htmlFor='description' >
              Description
              <br/>
              <textarea id='description' name='description' defaultValue={deck.description} />
            </label>
            <div>
              <Link to={`/decks/${id}`}>Cancel</Link>
              <button type='submit'>Submit</button>
            </div>
        </form>
      </>
    )
}

export default EditDecks;
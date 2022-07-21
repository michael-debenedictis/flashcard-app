import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api/index.js';
import BreadCrumb from "./BreadCrumb.js";

function EditDecks() {
    const history = useHistory();
    const params = useParams();
    const id = params.deckId;
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
      async function loadDeck() {
        const response = await readDeck(id);
        setDeck({...response});
        setCards([...response.cards]);
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
      <BreadCrumb name={deck.name} />
        <h2>Edit Deck</h2>
        <form name='editdeck' onSubmit={handleSubmit}>
            <label htmlFor='name' >
              Name
              <br/>
              <input id='name' name='name' type='text' defaultValue={deck.name} style={{ borderRadius: '5px', border: '1px solid gray', width: '500px' }} />
            </label>
            <br/>
            <label htmlFor='description' >
              Description
              <br/>
              <textarea id='description' name='description' defaultValue={deck.description} style={{ borderRadius: '5px', width: '500px' }} />
            </label>
            <div>
              <Link style={{ background: 'gray', color: 'white', padding: '2px', border: '3px outset gray', borderRadius: '5px', marginRight: '5px' }} to={`/decks/${id}`}>Cancel</Link>
              <button style={{ background: '#3364FF', color: 'white', padding: '2px', border: '3px outset #3364FF', borderRadius: '5px' }} type='submit'>Submit</button>
            </div>
        </form>
      </>
    )
}

export default EditDecks;
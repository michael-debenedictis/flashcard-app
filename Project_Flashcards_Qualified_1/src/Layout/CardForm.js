import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createCard, updateCard, readDeck, readCard, readCards } from "../utils/api/index.js";

function CardForm( { form, setForm, formInitial, handleChange, card } ) {
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [cardsNum, setCardsNum] = useState();
  

  const params = useParams();
  const id = params.deckId;
  const cardId = params.cardId;

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(id);
      setDeck({...response});
    }
    loadDeck();
  },[]);

  useEffect(() => {
    async function loadCards() {
      const response = await readCards();
      if (response) {
        setCardsNum(response.length)
      }
    }
    loadCards();
  },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cardId) {
      event.preventDefault();
    const cardUpdated = {
        ...card,
        front: event.target.front.value,
        back: event.target.back.value
    };
    updateCard(cardUpdated);
    history.push(`/decks/${params.deckId}`)
    } else {
      createCard(id, form);
      setForm(formInitial);
    }
  }
  
  return (
    <>
      <h3>{cardId ? 'Edit Card' : 'Add Card'}</h3>
      <form name='addcards' onSubmit={handleSubmit} >
        <div>
          <label htmlFor='front'>
            Front
            <br/>
            <textarea id='front' name='front' onChange={handleChange} value={cardId ? null : form.front} required placeholder='Front side of card' defaultValue={cardId ? card.front : null} style={{ borderRadius: '5px', width: '500px' }} />
          </label>
        </div>
        <div>
          <label htmlFor='back'>
            Back
            <br/>
            <textarea id='back' name='back' onChange={handleChange} value={cardId ? null : form.back} required placeholder='Back side of card' defaultValue={cardId ? card.back : null} style={{ borderRadius: '5px', width: '500px' }} />
          </label>
        </div>
        <div>
          <Link to={`/decks/${params.deckId}`} style={{ background: 'gray', color: 'white', padding: '2px', border: '3px outset gray', borderRadius: '5px', marginRight: '5px' }} >{cardId ? 'Cancel' : 'Done'}</Link>
          <button type='submit' style={{ background: '#3364FF', color: 'white', padding: '2px', border: '3px outset #3364FF', borderRadius: '5px' }} >{cardId ? 'Submit' : 'Save'}</button>
        </div>
      </form>
    </>
  )
}
export default CardForm;

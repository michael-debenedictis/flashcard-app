import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from 'react-router-dom';
import { readCard, updateCard } from '../utils/api/index.js';

function EditCards() {
  const history = useHistory();
  const params = useParams();
  const id = params.cardId;
  const [card, setCard] = useState({});
  useEffect(() => {
    async function loadCard() {
      const response = await readCard(id);
      setCard({...response});
    }
    loadCard();
  },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardUpdated = {
        ...card,
        front: event.target.front.value,
        back: event.target.back.value
    };
    updateCard(cardUpdated);
    history.push(`/decks/${params.deckId}`);
  }

  return (
    <>
      <h2>Edit Card</h2>
      <form name='editcard' onSubmit={handleSubmit}>
        <label htmlFor='front' >
          Front
          <br/>
          <textarea id='front' name='front' defaultValue={card.front} />
        </label>
        <br/>
        <label htmlFor='back' >
          Back
          <br/>
          <textarea id='back' name='back' defaultValue={card.back} />
        </label>
        <div>
          <Link to={`/decks/${params.deckId}`} >Cancel</Link>
          <button type='submit' >Submit</button>
        </div>
      </form>
    </>
  )
}




export default EditCards;
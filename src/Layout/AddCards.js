import React from "react";
import { useEffect, useState } from "react";
import { readDeck, readCards, createCard } from "../utils/api/index.js";
import { Link, useParams } from "react-router-dom";

function AddCards() {
  const [deck, setDeck] = useState({});
  const [cardsNum, setCardsNum] = useState();

  const params = useParams();
  const id = params.deckId;

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

  const formInitial = {
    front: '',
    back: '',
    deckId: id,
    id: ''
  }
  const [form, setForm] = useState({...formInitial});

  const handleChange = ( {target} ) => {
    console.log(form)
    if (target.id === 'front') {
      console.log('front', target.id, target.value)
      setForm((cur) => {
        return {
          ...cur,
          front: target.value
        }
      })
    } else if (target.id === 'back') {
      console.log('back', target.id, target.value)
      setForm((cur) => {
        return {
          ...cur,
          back: target.value
        }
      })
    }
    console.log(form)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(id, form);
    setForm(formInitial);
  }

  return (
    <>
      <h2>{deck.name}</h2>
      <h3>Add Card</h3>
      <form name='addcards' onSubmit={handleSubmit} >
        <div>
          <label htmlFor='front'>
            Front
            <br/>
            <textarea id='front' name='front' onChange={handleChange} value={form.front} required placeholder='Front side of card' />
          </label>
        </div>
        <div>
          <label htmlFor='back'>
            Back
            <br/>
            <textarea id='back' name='back' onChange={handleChange} value={form.back} required placeholder='Back side of card' />
          </label>
        </div>
        <div>
          <Link to={`/decks/${id}`} >Done</Link>
          <button type='submit' >Save</button>
        </div>

      </form>
    </>
  )
}

export default AddCards;
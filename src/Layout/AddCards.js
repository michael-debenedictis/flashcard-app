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
    const abortController = new AbortController();
    async function loadDeck() {
      const response = await readDeck(id, abortController.signal);
      try {
        setDeck({...response});
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

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCards() {
      const response = await readCards(abortController.signal);
      try {
        if (response) {
          setCardsNum(response.length)
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
      <h2>{deck.name}: Add Card</h2>
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
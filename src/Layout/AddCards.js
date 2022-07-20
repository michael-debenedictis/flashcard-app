import React from "react";
import { useEffect, useState } from "react";
import { readDeck, readCards, createCard } from "../utils/api/index.js";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm.js";
import BreadCrumb from "./BreadCrumb.js";

function AddCards() {
  const [deck, setDeck] = useState({});

  const params = useParams();
  const id = params.deckId;

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(id);
      setDeck({...response});
    }
    loadDeck();
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
  }

  return (
    <>
      <BreadCrumb name={deck.name} />
      <CardForm form={form} setForm={setForm} formInitial={formInitial} handleChange={handleChange} />
    </>
  )
}

export default AddCards;
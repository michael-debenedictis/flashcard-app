import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from 'react-router-dom';
import { readCard, updateCard } from '../utils/api/index.js';
import BreadCrumb from "./BreadCrumb.js";
import CardForm from './CardForm.js';

function EditCards() {
  const history = useHistory();
  const params = useParams();
  const cardId = params.cardId;
  const [card, setCard] = useState({});
  useEffect(() => {
    async function loadCard() {
      const response = await readCard(cardId);
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
      <BreadCrumb />
      <CardForm card={card} />
    </>
  )
}




export default EditCards;
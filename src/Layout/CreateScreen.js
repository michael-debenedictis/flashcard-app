import React from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from '../utils/api/index.js';
import { listDecks } from "../utils/api/index.js";
import BreadCrumb from "./BreadCrumb.js";

function CreateScreen() {
  const history = useHistory();
  const handleCancel = () => {
    history.push('/')
  }

  const handleCreate = async (event) => {
    event.preventDefault();
    event.persist();
    const decks = await listDecks();
    const newId = decks.length + 1;
    const deck = {
      id: newId,
      name: event.target.name.value,
      description: event.target.description.value
    };
    createDeck(deck);
    history.push(`/decks/${newId}`);
  }

  return (
    <>
      <BreadCrumb />
      <h2>Create Deck</h2>
      <form name='create' onSubmit={handleCreate} >
        <div>
          <label htmlFor="name">
            Name
            <br />
            <input type="text" id='name' name="name" placeholder="Deck Name" style={{ borderRadius: '5px', border: '1px solid gray', width: '500px' }} />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <br />
            <textarea
              id='description'
              name="description"
              placeholder="Description of the deck"
              style={{ borderRadius: '5px', width: '500px' }}
            />
          </label>
        </div>
        <div>
            <button style={{ background: 'gray', color: 'white', padding: '2px', border: '3px outset gray', borderRadius: '5px', marginRight: '5px' }} onClick={handleCancel}>Cancel</button>
            <button style={{ background: '#3364FF', color: 'white', padding: '2px', border: '3px outset #3364FF', borderRadius: '5px' }} type='submit' >Submit</button>
        </div>
      </form>
    </>
  );
}

export default CreateScreen;

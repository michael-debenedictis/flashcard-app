import React, { useEffect, useState } from "react";
import { listDecks, deleteDeck } from "../utils/api/index.js";
import { Link } from 'react-router-dom';

function Home() {
  const [decks, setDecks] = useState([])

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDecks([...response]);
    }
    loadDecks();
  },[]);

  const handleDelete = ( {target} ) => {
    const confirmation = window.confirm('Delete this deck?\nYou will not be able to recover it.');
    if (confirmation) {
      const idTarget = parseFloat(target.id);
      setDecks((cur) => {
        const curDecks = [...cur];
        const filtered = curDecks.filter((item) => item.id !== idTarget);
        return [...filtered];
      });
      deleteDeck(target.id);
    } else {
      return
    }
  }
  console.log(decks, 'hi')
  return (
    <>
      {decks.map((item) => {
        return (
          <div key={item.id} style={{border: 'solid', margin: '5px'}} >
            <div>
              <h3>{item.name}</h3>
              <p>{item.cards.length === 1 ? '1 card' : `${item.cards.length} cards`}</p>
            </div>
            <p>{item.description}</p>
            <Link to={`/decks/${item.id}`}>View</Link>
            <Link to={`/decks/${item.id}/study`}>Study</Link>
            <button id={item.id} onClick={handleDelete}>Delete</button>
          </div>
        )
      })}
    </>
  )
}


export default Home;
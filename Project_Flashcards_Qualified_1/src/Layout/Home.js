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
  return (
    <>
      {decks.map((item) => {
        return (
          <div key={item.id} style={{ margin: '15px', border: '2px solid gray', borderRadius: '5px' }} >
            <div style={{margin: '10px'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px' }} >
                <h3>{item.name}</h3>
                <p>{item.cards.length === 1 ? '1 card' : `${item.cards.length} cards`}</p>
              </div>
              <p style={{ margin: '5px' }} >{item.description}</p>
              <div style={{ margin: '5px', display: 'flex', gap: '5px' }} >
                <Link style={{ background: 'gray', color: 'white', padding: '2px', border: '3px outset gray', borderRadius: '5px' }} to={`/decks/${item.id}`}>View</Link>
                <Link style={{ background: '#3364FF', color: 'white', padding: '2px', border: '3px outset #3364FF', borderRadius: '5px' }} to={`/decks/${item.id}/study`}>Study</Link>
                <button id={item.id} onClick={handleDelete} style={{ alignSelf: 'flex-end', background: '#C70039', color: 'white', border: '3px outset #C70039', borderRadius: '5px' }} >Delete</button>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}


export default Home;
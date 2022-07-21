import React from "react";
import { Link, Switch, useParams, Route } from "react-router-dom";

function BreadCrumb( { name } ) {
  const params = useParams();
  const id = params.deckId;
  return (
    <>
      <Switch>
        <Route exact path='/decks/new' >
          <div style={{display: 'flex', borderRadius: '5px', background: '#eeeeee', alignItems: 'center', marginBottom: '10px', padding: '10px', gap: '5px'}} >
            <Link to="/">Home</Link>
            <div>/</div>
            <div>Create Deck</div>
          </div>
        </Route>
        <Route exact path="/decks/:deckId" >
          <div style={{display: 'flex', borderRadius: '5px', background: '#eeeeee', alignItems: 'center', marginBottom: '10px', padding: '10px', gap: '5px'}} >
            <Link to="/">Home</Link>
            <div>/</div>
            <div>{name}</div>
          </div>
        </Route>
        <Route exact path="/decks/:deckId/study" >
          <div style={{display: 'flex', borderRadius: '5px', background: '#eeeeee', alignItems: 'center', marginBottom: '10px', padding: '10px', gap: '5px'}} >
            <Link to="/">Home</Link>
            <div>/</div>
            <Link to={`/decks/${id}`} >{name}</Link>
            <div>/</div>
            <div>Study</div>
          </div>
        </Route>
        <Route exact path="/decks/:deckId/cards/new" >
          <div style={{display: 'flex', borderRadius: '5px', background: '#eeeeee', alignItems: 'center', marginBottom: '10px', padding: '10px', gap: '5px'}} >
            <Link to="/">Home</Link>
            <div>/</div>
            <Link to={`/decks/${id}`} >{name}</Link>
            <div>/</div>
            <div>Add Card</div>
          </div>
        </Route>
        <Route exact path="/decks/:deckId/edit" >
          <div style={{display: 'flex', borderRadius: '5px', background: '#eeeeee', alignItems: 'center', marginBottom: '10px', padding: '10px', gap: '5px'}} >
            <Link to="/">Home</Link>
            <div>/</div>
            <Link to={`/decks/${id}`} >{name}</Link>
            <div>/</div>
            <div>Edit Deck</div>
          </div>
        </Route>
        <Route exact path="/decks/:deckId/cards/:cardId/edit" >
          <div style={{display: 'flex', borderRadius: '5px', background: '#eeeeee', alignItems: 'center', marginBottom: '10px', padding: '10px', gap: '5px'}} >
            <Link to="/">Home</Link>
            <div>/</div>
            <Link to={`/decks/${id}`} >Deck</Link>
            <div>/</div>
            <div>Edit Card</div>
          </div>
        </Route>
      </Switch>
    </>
  );
}

export default BreadCrumb;

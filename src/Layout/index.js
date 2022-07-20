import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Create from "./Create.js";
import BreadCrumb from "./BreadCrumb";
import CreateScreen from "./CreateScreen.js";
import DecksScreen from "./DecksScreen";
import StudyScreen from "./StudyScreen";
import Home from "./Home.js"
import AddCards from "./AddCards";
import {
  Route,
  Switch
} from "react-router-dom";
import EditDecks from "./EditDecks";
import EditCards from "./EditCards";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" >
            <Create />
            <Home />
          </Route>
          <Route exact path='/decks/new' >
            <CreateScreen />
          </Route>
          <Route exact path="/decks/:deckId" >
            <DecksScreen />
          </Route>
          <Route exact path="/decks/:deckId/study" >
            <StudyScreen />
          </Route>
          <Route exact path="/decks/:deckId/cards/new" >
            <AddCards />
          </Route>
          <Route exact path="/decks/:deckId/edit" >
            <EditDecks />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit" >
            <EditCards />
          </Route>
          <Route>
            <BreadCrumb />
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;

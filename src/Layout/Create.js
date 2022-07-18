import React from "react"
import {Link} from 'react-router-dom';

function Create() {
    return (
        <div>
          <Link to='decks/new' >
            Create Deck
          </Link>
        </div>
    );
}

export default Create;
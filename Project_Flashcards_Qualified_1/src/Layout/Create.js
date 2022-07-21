import React from "react"
import {Link} from 'react-router-dom';

function Create() {
    return (
        <div>
          <Link to='decks/new' style={{ background: 'gray', color: 'white', padding: '5px', border: '3px outset gray', borderRadius: '5px' }} >
            Create Deck
          </Link>
        </div>
    );
}

export default Create;
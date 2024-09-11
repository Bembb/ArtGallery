import React from 'react';
import { useParams } from 'react-router-dom';
function Artwork() {
    const {id}   = useParams();

    return (
        <div id="app">
            <h1>Work Title</h1>
            <p>Work ID: {id}</p>
        </div>

    );
 }

export default Artwork;

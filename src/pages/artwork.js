import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequestWithNativeFetch } from '../fetch';
import '../App.css';

function Artwork() {
    const {id}   = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch data for artwork
    useEffect(() => {
        const fetchSingleWork = async () => {
          try {
            const artData = await getRequestWithNativeFetch(
              "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + id
            );
            setData(artData);
            setError(null);
          } catch (err) {
            setError(err.message);
            setData(null);
          } finally {
            setLoading(false);
          }

        };
      
        fetchSingleWork();
      }, []);

    return (
        <div className='artPage'>
        {loading && (<div>Loading... Please wait...</div>)}
        {error && <div>{error}</div>}
            <h1>{data?.title}</h1>
            <hr/> <br/>
            <img src={data?.primaryImage} alt={data?.title}/>
            <p>Work ID: {id}</p>          
            {data?.artistDisplayName && <p>Artist: {data?.artistDisplayName}</p>}
            {data?.objectDate && <p>Date Created: {data?.objectDate}</p>}
            {data?.medium && <p>Medium: {data?.medium}</p>}
            {data?.culture && <p>Culture: {data?.culture}</p>}
            {data?.department && <p>Department: {data?.department}</p>}
        </div>

    );
 }

export default Artwork;

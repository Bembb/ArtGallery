import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

const Gallery = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworkIDs = async () => {
      try {
        // fetch list of ids 
        const response = await fetch(
          "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q='painting'"
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        let idList = await response.json();
        // get 10 random artworks
        var tenArtIDs = [];
        // loop through 10
        for(let i = 0; i<10; i++){
          // get random number 
          var rand = Math.floor(Math.random() * idList.total+1);
          
          // keep re-choosing random number until it's different
          while (tenArtIDs.includes(rand)){
            rand = Math.floor(Math.random() * idList.length+1);
          }
          // add the artwork associated with that random object id to the list of ids
          tenArtIDs.push(idList.objectIDs[rand]);
          
        }
        console.log(tenArtIDs);


        // return array of artwork information for each work in id list
        const dataArray = await Promise.all(tenArtIDs.map(async id => {

          const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + id)
          const artData = await response.json()
          // console.log(artData)
          return artData
        }))

        setData(dataArray);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworkIDs();

  }, []);
  return (
    <div className="flex"> 
       {loading && (<div>Loading... Please wait...</div>)}
       {error && <div>{error}</div>}
       {/* {JSON.stringify(data)}  */}

       {/* After data is loaded, display each artwork */}

       {data && 
          data.map(({objectID,title,primaryImageSmall, artistDisplayName}) => (
            <div className="galleryItem">
              <NavLink
                  to={`/artworks/${objectID}`}
                >
                    <img src={primaryImageSmall} alt="(img not found)"/>
                    <p>{title}</p>
                    <p>Artist: {artistDisplayName}</p>

                </NavLink>
            </div>
          )
       )}

    </div> 
    
  );
};

export default Gallery;
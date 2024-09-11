import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const FetchGetRequest = () => {
  const [data, setData] = useState(null);
  const [artData, setArtData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworkIDs = async () => {
      try {
        const response = await fetch(
          "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q='painting'"
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData = await response.json();
        setData(postsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworkIDs();

    let artDataArray = [];
    for(let i =0; i<Object.keys(data).length; i++){
        artDataArray.push(fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + data.objectID))
    }
    Promise.all(artDataArray)
    .then(values=>values.map(value=>console.log(value.url+" ==> "+value.status)))
    .catch(err => console.log(err))

    setArtData(artDataArray);

  }, []);

  return (
    <div>
        {loading && (<div>Loading... Please wait...</div>)}
        {error && <div>{error}</div>}

        {data && 
            data.map(({objectID}) => (
                <div class="flex">
                key={objectID}
                
                className="border-b border-gray-100 text-sm sm:text-base"
              
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses = 'p-4 block hover:bg-gray-100';
                    return isActive
                      ? `${baseClasses} bg-gray-100`
                      : baseClasses;
                  }}
                  to={`/artworks/${objectID}`}
                >
                  {/* {artData.find(objectID).title} */}
                </NavLink>

                <div>
            {/* <p>Work Title: {artData.find(objectID).title}</p> */}
            <p>Work ID: {objectID}</p>
        </div>
                </div>
                

            )) }



    </div>  
    
  );
};

export default FetchGetRequest;
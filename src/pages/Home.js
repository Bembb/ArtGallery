import Gallery from "../gallery";
const Home = () => {
    return(
    <div className="App">

      <header className="App-header">
        <h1>Megan's Gallery</h1>
        <p>
          Welcome to my art gallery! Art accessed through the Metropolitan Museum of Art Collection API.
        </p>

        <Gallery/>
      </header>
    </div>
    )
};

export default Home;
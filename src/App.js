import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Artwork from "./pages/artwork";
import FetchGetRequest from "./fetch";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path={"/artworks/:id"} element={<FetchGetRequest/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;

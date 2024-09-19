import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Artwork from "./pages/artwork";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path={"/artworks/:id"} element={<Artwork/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import Header from "components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "components/Footer/Footer";
import Types from "components/Types/Types";
import Home from "components/Home/Home";
import PokemonView from "components/PokemonView/PokemonView";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/types" exact element={<Types />} />
            <Route path="/types/:type" element={<Types />} />
            <Route path="/pokemon/:id" element={<PokemonView />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

// Styles ----------------------------------
import "components/Home/Home.scss";

// Components ----------------------------------
import React, { useState, useEffect } from "react";
import Paginator from "components/UI/Paginator/Paginator";
import ErrorComponent from "components/UI/ErrorComponent/ErrorComponent";
import Pokemons from "components/Pokemons/Pokemons";

// Utils ----------------------------------
import axios from "axios";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pages, setPages] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        setPokemons(res.data.results);
        setPages(Math.floor(res.data.count / 20));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []);

  const paginatorHandler = (page) => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=" + (page * 20).toString())
      .then((res) => {
        setPokemons(res.data.results);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="mainContainer">
      {errorMessage && (
        <ErrorComponent
          message={errorMessage}
          clicked={() => setErrorMessage()}
        />
      )}
      <div>
        <div className="pokemonsContainer">
          <Pokemons pokemons={pokemons} />
        </div>

        <Paginator clicked={paginatorHandler} pages={pages} />
      </div>
    </div>
  );
};

export default Home;

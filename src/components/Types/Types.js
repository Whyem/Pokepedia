// Styles ----------------------------------
import "components/Types/Types.scss";

// Components ----------------------------------
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pokemons from "components/Pokemons/Pokemons";
import Paginator from "components/UI/Paginator/Paginator";
import ErrorComponent from "components/UI/ErrorComponent/ErrorComponent";

// Utils ----------------------------------
import axios from "axios";

const Types = () => {
  const navigate = useNavigate();
  let { type = "normal" } = useParams();
  const [types, setTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [pages, setPages] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((res) => {
        if (type) {
          var type_url = res.data.results.find((el) => el.name == type).url;
        }
        const typesComp = res.data.results.map((t) => {
          return (
            <option value={t.name} key={t.name} selected={t.name == type}>
              {t.name}
            </option>
          );
        });
        setTypes(typesComp);

        if (type) {
          axios
            .get(type_url)
            .then((res) => {
              const res_pokemons = res.data.pokemon.map((el) => el.pokemon);
              setPokemons(res_pokemons);
              setPages(Math.floor(res_pokemons.length / 20));
              setPaginated(res_pokemons.slice(0, 20));
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((res) => {
        if (type) {
          var type_url = res.data.results.find((el) => el.name == type).url;
        }
        const typesComp = res.data.results.map((t) => {
          return (
            <option value={t.name} key={t.name} selected={t.name == type}>
              {t.name}
            </option>
          );
        });
        setTypes(typesComp);

        if (type) {
          axios
            .get(type_url)
            .then((res) => {
              const res_pokemons = res.data.pokemon.map((el) => el.pokemon);
              setPokemons(res_pokemons);
              setPages(Math.floor(res_pokemons.length / 20));
              setPaginated(res_pokemons.slice(0, 20));
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [type]);

  const selectTypeHandler = (event) => {
    navigate("/types/" + event.target.value);
  };

  const paginatorHandler = (page) => {
    const temp_paginated = [...pokemons].slice(page * 20, (page + 1) * 20);
    setPaginated(temp_paginated);
  };

  return (
    <React.Fragment>
      {errorMessage && (
        <ErrorComponent
          message={errorMessage}
          clicked={() => setErrorMessage()}
        />
      )}
      <div className="selectContainer">
        <label>Types</label>
        <select onChange={(event) => selectTypeHandler(event)}>{types}</select>
      </div>

      <div className="pokemonsContainer">
        <Pokemons pokemons={paginated} />
      </div>

      <Paginator clicked={paginatorHandler} pages={pages} />
    </React.Fragment>
  );
};

export default Types;

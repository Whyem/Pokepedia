// Styles ----------------------------------
import "components/Pokemon/Pokemon.scss";

// Components ----------------------------------
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorComponent from "components/UI/ErrorComponent/ErrorComponent";
import TypePill from "components/UI/TypePill/TypePill";
import Loading from "components/UI/Loading/Loading";

// Utils ----------------------------------
import axios from "axios";

const Pokemon = (props) => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [pokemonImg, setPokemonImg] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const typeColors = {
    normal: "#C6C5A6",
    fighting: "#D37C24",
    flying: "#A38EF1",
    poison: "#C477CF",
    ground: "#9F7133",
    rock: "#605A58",
    bug: "#DCED14",
    ghost: "#6648CC",
    steel: "#C8D2D4",
    fire: "#F88E2F",
    water: "#58DDF7",
    grass: "#9DDC3C",
    electric: "#FFED4B",
    psychic: "#E58CCD",
    ice: "#3DEAEF",
    dragon: "#3959EB",
    dark: "#223C43",
    fairy: "#D97ECA",
    unknown: "red",
    shadow: "black",
  };

  useEffect(() => {
    axios
      .get(props.url)
      .then((res) => {
        setPokemon(res.data);
        setPokemonImg(res.data.sprites.front_default);
        let typesComp = res.data.types.map((type, index) => {
          return (
            <TypePill
              type={type.type.name}
              key={index}
              color={typeColors[type.type.name]}
            />
          );
        });
        setTypes(typesComp);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [props.url]);

  const showBackHandler = (b) => {
    if (b) {
      setPokemonImg(pokemon.sprites.back_default);
    } else {
      setPokemonImg(pokemon.sprites.front_default);
    }
  };

  return (
    <div className="pokemonContainer">
      {errorMessage && (
        <ErrorComponent
          message={errorMessage}
          clicked={() => setErrorMessage()}
        />
      )}
      <div className="redHeader"></div>
      <div className="middle">
        <div className="circle"></div>
      </div>
      <div className="content">
        {loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <img
              className="pokemon__img"
              alt={pokemon.name}
              src={pokemonImg}
              onMouseEnter={() => showBackHandler(true)}
              onMouseLeave={() => showBackHandler(false)}
            />
            <Link
              className="pokemon__link"
              to={"/pokemon/" + pokemon.id.toString()}
            >
              <h1 className="pokemon__name">{pokemon.name}</h1>
            </Link>
            <div className="typesContainer">{types}</div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Pokemon;

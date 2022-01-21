// Styles ----------------------------------
import "components/Pokemons/Pokemons.scss";

// Components ----------------------------------
import React from "react";
import Pokemon from "components/Pokemon/Pokemon";

const Pokemons = (props) => {
  const pokemonComp = props.pokemons.map((pokemon, index) => {
    return <Pokemon url={pokemon.url} key={index} />;
  });

  return <React.Fragment>{pokemonComp}</React.Fragment>;
};

export default Pokemons;

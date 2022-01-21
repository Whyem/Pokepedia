// Styles ----------------------------------
import "components/PokemonView/PokemonView.scss";

// Components ----------------------------------
import React, { useState, useEffect } from "react";
import TypePill from "components/UI/TypePill/TypePill";
import { useParams } from "react-router-dom";
import Loading from "components/UI/Loading/Loading";
import ErrorComponent from "components/UI/ErrorComponent/ErrorComponent";

// Utils ----------------------------------
import axios from "axios";

const PokemonView = (props) => {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [evolutions, setEvolutions] = useState([]);
  const [currentPhase, setCurrentPhase] = useState();
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
      .get("https://pokeapi.co/api/v2/pokemon/" + id.toString())
      .then((res) => {
        setPokemon(res.data);
        let typesComp = res.data.types.map((type, index) => {
          return (
            <TypePill
              key={index}
              type={type.type.name}
              color={typeColors[type.type.name]}
            />
          );
        });

        let abilitiesComp = res.data.abilities.map((ability, index) => {
          return <p key={index}>{ability.ability.name}</p>;
        });

        setTypes(typesComp);
        setAbilities(abilitiesComp);

        var speciesUrl = res.data.species.url;

        axios
          .get(speciesUrl)
          .then((res) => {
            var evolution_chainUrl = res.data.evolution_chain.url;

            axios
              .get(evolution_chainUrl)
              .then((res) => {
                var evolutionsUrls = [];
                evolutionsUrls.push(res.data.chain.species.url);

                var evolves_to = res.data.chain.evolves_to[0];

                while (evolves_to) {
                  evolutionsUrls.push(evolves_to.species.url);
                  evolves_to = evolves_to.evolves_to[0];
                }

                setEvolutions(evolutionsUrls);
                setCurrentPhase(
                  evolutionsUrls.indexOf(
                    "https://pokeapi.co/api/v2/pokemon-species/" +
                      id.toString() +
                      "/"
                  )
                );
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });

            setLoading(false);
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [props.url]);

  useEffect(() => {}, [props]);

  const evolutionHandler = () => {
    setLoading(true);
    const next = (currentPhase + 1) % evolutions.length;
    const pokeUrl = evolutions[next].replace("pokemon-species", "pokemon");
    setCurrentPhase(next);
    axios
      .get(pokeUrl)
      .then((res) => {
        setPokemon(res.data);
        let typesComp = res.data.types.map((type, index) => {
          return (
            <TypePill
              type={type.type.name}
              key={index}
              color={typeColors[type.type.name]}
            />
          );
        });
        let abilitiesComp = res.data.abilities.map((ability, index) => {
          return <p key={index}>{ability.ability.name}</p>;
        });
        setTypes(typesComp);
        setAbilities(abilitiesComp);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <React.Fragment>
      {errorMessage && (
        <ErrorComponent
          message={errorMessage}
          clicked={() => setErrorMessage()}
        />
      )}
      <div className="pokemonViewContainer">
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
                src={pokemon.sprites.front_default}
              />
              <h1>{pokemon.name}</h1>
              <div className="typesContainer">{types}</div>

              <div>
                <h3>Abilities</h3>
                <div className="abilitiesContainer">{abilities}</div>
              </div>

              {evolutions.length > 1 && (
                <button className="evolutionButton" onClick={evolutionHandler}>
                  Evolution
                </button>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PokemonView;

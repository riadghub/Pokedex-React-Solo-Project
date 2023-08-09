import React, { useState } from "react";
import { Pokemon } from "../interface";
import "./pokemon.css";
import PokemonList from "./PokemonList";

interface Props {
  pokemons: Pokemon[];
}

const PokemonColection: React.FC<Props> = (props) => {
  const { pokemons } = props;
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showShiny, setShowShiny] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | null>(null);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setShowShiny(false);
    setSelectedGender(null);
  };

  const handleCloseDetails = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains("overlay")) {
      setSelectedPokemon(null);
    }
  };

  const handleToggleShiny = () => {
    setShowShiny(!showShiny);
  };

  const handleGenderSelect = (gender: "male" | "female") => {
    setSelectedGender(gender);
  };

  return (
    <>
      <section className="collection-container">
        {pokemons.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              className={`pokemon-card ${selectedPokemon === pokemon ? "selected" : ""}`}
              onClick={() => handlePokemonClick(pokemon)}
            >
              <PokemonList
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                image={
                  showShiny && selectedPokemon === pokemon
                    ? selectedGender === "female"
                      ? pokemon.sprites.front_shiny_female || pokemon.sprites.front_shiny
                      : pokemon.sprites.front_shiny
                    : selectedGender === "female"
                    ? pokemon.sprites.front_female || pokemon.sprites.front_default
                    : pokemon.sprites.front_default
                }
                type={pokemon.types[0].type.name}
              />
            </div>
          );
        })}
      </section>
      {selectedPokemon && (
        <div className={`overlay`} onClick={handleCloseDetails}>
          <div className={`selected-pokemon-details ${selectedPokemon.types[0].type.name}`}>
            <img
              src={
                showShiny
                  ? selectedGender === "female"
                    ? selectedPokemon.sprites.front_shiny_female || selectedPokemon.sprites.front_shiny
                    : selectedPokemon.sprites.front_shiny
                  : selectedGender === "female"
                  ? selectedPokemon.sprites.front_female || selectedPokemon.sprites.front_default
                  : selectedPokemon.sprites.front_default
              }
              alt={selectedPokemon.name}
            />
            <h2>ID: {selectedPokemon.id}</h2>
            <h2>{selectedPokemon.name}</h2>
            <p>Type: {selectedPokemon.types[0].type.name}</p>
            {selectedPokemon.sprites.front_female !== null ? (
              <div>
                <p>Gender: {selectedGender || "Unknown"}</p>
                <button onClick={handleToggleShiny}>Version Shiny</button>
                <div>
                  <button onClick={() => handleGenderSelect("male")}>Male</button>
                  <button onClick={() => handleGenderSelect("female")}>Female</button>
                </div>
              </div>
            ) : (
              <div>
                <p>
                  Il n'y a pas de différence <br></br>
                  entre la version mâle <br></br>
                  et femelle.
                </p>
                <button onClick={handleToggleShiny}>Version Shiny</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonColection;

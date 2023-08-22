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
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setShowShiny(false);
    setSelectedGender(null);
    setIsDropdownVisible(false);
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

  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    const newSearchTerm = event.currentTarget.value;
    setSearchTerm(newSearchTerm);
    setIsDropdownVisible(newSearchTerm !== "" && filteredPokemons.length > 0);
    setSelectedPokemon(null);
    setShowShiny(false);
    setSelectedGender(null);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  
  const filteredPokemonsByType = filteredPokemons.filter((pokemon) =>
    selectedTypes.length === 0 ? true : pokemon.types.some((t) => selectedTypes.includes(t.type.name))
  );

  return (
    <>
      <div className="search-bar">
        <input
          id="textbar"
          type="text"
          placeholder="Nom du Pokémon..."
          value={searchTerm}
          onInput={handleSearchInput}
        />
        {isDropdownVisible && (
          <div className="dropdown">
            {filteredPokemons.slice(0, 6).map((pokemon) => (
              <div
                key={pokemon.id}
                className="dropdown-item"
                onClick={() => handlePokemonClick(pokemon)}
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="pokemon-icon"
                />
                {pokemon.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="type-filter">
        <label>Filtrer par type :</label>
        <br></br>
        {["fire", "water", "grass", "electric", "normal","rock","bug","poison","fairy"].map((type) => (
          <label key={type} className="type-checkbox">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeToggle(type)}
            />
            {type}
          </label>
        ))}
      </div>

      <section className="collection-container">
        {filteredPokemonsByType.map((pokemon) => {
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

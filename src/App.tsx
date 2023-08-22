import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import PokemonCollection from "./components/PokemonCollection";
import { Pokemon } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");

      setNextUrl(res.data.next);

      const newPokemonsData = await Promise.all(
        res.data.results.map(async (pokemon: Pokemons) => {
          const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          return poke.data;
        })
      );

      setPokemons(newPokemonsData);
    };

    getPokemon();
  }, []);

  const nextPage = async () => {
    let res = await axios.get(nextUrl);

    setNextUrl(res.data.next);

    const newPokemonsData = await Promise.all(
      res.data.results.map(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        return poke.data;
      })
    );

    setPokemons((prevPokemons) => [...prevPokemons, ...newPokemonsData]);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header"> <span>My</span>Pokedex</header>
        <PokemonCollection pokemons={pokemons} />
        <button onClick={nextPage}>Charger</button>
      </div>
    </div>
  );
};

export default App;

// Made by Riad
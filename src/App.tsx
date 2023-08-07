import React, { useEffect, useState } from 'react';
import PokemonCollection from './components/PokemonCollection';
import { Pokemon } from "../interface"
import axios from "axios";
import logo from './logo.svg';

import './App.css';

interface Pokemons {
  name : string
  url : string
}

function App() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])

// appel de l'API lorsque la page est chargée

  useEffect(() => {

    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
        )
        res.data.results.forEach(async (pokemon : Pokemons) => {
          const poke = await axios.get(
            `https://pokeapi.co/api/v2/pokemon${pokemon.name}`
            )

            setPokemons((p) => [...p, poke.data])
        })
    }
    getPokemon()

  }, [])

  // notre affichage 

  return (
    <div className="App">
      <header className="pokemon-header">Pokemon</header>
      <PokemonCollection pokemons={pokemons}/>
    </div>
  );
}

export default App;

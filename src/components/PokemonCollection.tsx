import React from 'react'
import { Pokemon } from '../../interface'

interface Props {
  pokemons : Pokemon[]
}

function PokemonCollection(props : Props) {
  const {pokemons} = props
  return <section className='collection-container'>PokemonCollection</section>  
}

export default PokemonCollection
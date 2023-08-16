import React from "react"

interface Props {
  name: string
  id: number
  image: string
  type: string
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function PokemonList(props: Props) {
  const { name, id, image, type } = props
  const capitalizedPokemonName = capitalizeFirstLetter(name);
  return (
    <div>
      <section className={`pokemon-list-container ${type} `}>
        <p className="pokemon-name"> # {id} </p>
        <p className="pokemon-name"> {capitalizedPokemonName} </p>
        <img src={image} alt={name} />
        <p className="pokemon-name"> Type : {type} </p>
      </section>
    </div>
  )
  
}

export default PokemonList

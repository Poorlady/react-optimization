import React from 'react'
import usePokemon from './usePokemon'
import Header from '@/shared/Header'

const PokemonCard = ({ pokemon: pokemonProp, style }) => {
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = usePokemon(pokemonProp.url)

  if (isLoading || !pokemon) return <div>Card Loading...</div>

  if (isError) return <div>Card Error: {error}</div>

  if (pokemon)
    return (
      <div style={style}>
        <Header/>
        <p style={{margin:'0'}}>{pokemon.name}</p>
      </div>
    )
}

export default PokemonCard

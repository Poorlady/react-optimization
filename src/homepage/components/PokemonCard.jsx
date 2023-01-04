import React, { forwardRef } from 'react'
import usePokemon from './usePokemon'
// import Header from '@/shared/Header'

const PokemonCard = forwardRef(({ pokemon: pokemonProp, style  }, ref) => {
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
      <div style={style} ref={ref}>
        {/* <Header/> */}
        <p style={{margin:'0'}}>{`${pokemon.name} ${ref ? 'ref':''}`}</p>
      </div>
    )
})

export default PokemonCard

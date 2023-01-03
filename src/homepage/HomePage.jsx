import React, { useState } from 'react'
import { FpsView } from 'react-fps'
import List from './components/List'
import PokemonCard from './components/PokemonCard'
import usePokemons from './components/usePokemons'
import Virtualization from './components/VirtualizationChild'

const HomePage = () => {
  const { data: pokemons, isLoading, isError, error } = usePokemons()
  const [scrollTop, setScrollTop] = useState(0)
  const itemHeight = 30
  const containerHeight = 500
  const startIndex = pokemons
    ? Math.max(0, Math.floor(scrollTop / itemHeight) - 3)
    : 0
  const endIndex = pokemons
    ? Math.min(
        pokemons.count * itemHeight,
        Math.floor((containerHeight + scrollTop) / itemHeight) + 3
      )
    : 0
  // console.log(startIndex, endIndex, scrollTop)

  function renderPokemon() {
    const filterPokemons = pokemons.results.slice(startIndex, endIndex)
    // console.log(filterPokemons, startIndex, endIndex)
    const mappedPokemons = filterPokemons.map((pokemon, i) => {
      const propStyle = {
        position: 'absolute',
        top: itemHeight * (startIndex + i) + 1,
        width: '100%',
        height: itemHeight,
      }
      return (
        <PokemonCard
          style={propStyle}
          // height={itemHeight}
          key={pokemon.name}
          pokemon={pokemon}
        />
      )
    })
    return mappedPokemons
  }

  function handleScroll(event) {
    setScrollTop(event.currentTarget.scrollTop)
  }

  if (isLoading) return <div>Loading Pokemon List...</div>

  if (isError) return <div>List Error: {error}</div>

  if (pokemons)
    return (
      <section>
        <FpsView width={240} height={180} left={60} top={80} />
        <List
          itemCount={pokemons.count}
          height={containerHeight}
          itemSize={itemHeight}
          width={'100%'}
          handleScroll={handleScroll}
        >
          {renderPokemon()}
        </List>
        {/* <div
          style={{
            maxHeight: '90px',
            border: '1px dotted red',
            overflowY: 'scroll',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              height: `${pokemons.count * itemHeight}`,
            }}
          >
            {pokemons
              ? pokemons.results.map((pokemon) => (
                  <Virtualization key={pokemon.name} height={itemHeight}>
                    <PokemonCard pokemon={pokemon} />
                  </Virtualization>
                ))
              : null}
          </div>
        </div> */}
        <div>Hello</div>
      </section>
    )
}

export default HomePage

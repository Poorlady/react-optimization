import React, { useCallback, useRef, useState } from 'react'
import { FpsView } from 'react-fps'
import List from './components/List'
import PokemonCard from './components/PokemonCard'
import usePokemons from './components/usePokemons'
import Virtualization from './components/VirtualizationChild'

const HomePage = () => {
  const [pageNum, setPageNum] = useState(0)
  const observer = useRef()
  const { data: pokemons, isLoading, isError, error } = usePokemons(pageNum)
  // console.log(pokemons)
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

  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log(entries[0].isIntersecting, entries, pokemons.next)
        if (entries[0].isIntersecting && (pokemons.next !== null)) {
          setPageNum((prev) => prev + 1);
        }
      });
      console.log(observer.current)
      if (node) observer.current.observe(node);
    },
    [isLoading, pokemons]
  )

  // console.log(pageNum)

  function renderPokemon() {
    const filterPokemons = pokemons.results.slice(startIndex, endIndex)
    // console.log(filterPokemons, startIndex, endIndex)
    const mappedPokemons = filterPokemons.map((pokemon, i) => {
      const isLastElement = pokemon.id === pokemons.results.length
      console.log('arr',isLastElement, pokemon , pokemons.results.length )
      const propStyle = {
        position: 'absolute',
        top: itemHeight * (startIndex + i) + 1,
        width: '100%',
        height: itemHeight,
      }
      if (isLastElement)
        return (
          <PokemonCard
            style={propStyle}
            // height={itemHeight}
            key={pokemon.name}
            pokemon={pokemon}
            ref={lastBookElementRef}
          />
        )
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
          innerHeight={pokemons.results.length * itemHeight}
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

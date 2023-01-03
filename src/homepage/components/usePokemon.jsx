import { useEffect, useReducer, useRef } from 'react'

const usePokemon = (pokemonURL) => {
  const [getPokemon, setGetPokemon] = useReducer(
    (initState, state) => ({
      ...initState,
      ...state,
    }),
    { isLoading: false, isError: false, erro: '', data: null }
  )
  const isMounted = useRef()

  async function fetchPokemon() {
    setGetPokemon({ isLoading: true })
    try {
      const result = await fetch(pokemonURL)
      const data = await result.json()
      setGetPokemon({ isLoading: false, data })
    } catch (error) {
      console.log(error)
      setGetPokemon({ isLoading: false, isError: true, error })
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  return getPokemon
}

export default usePokemon

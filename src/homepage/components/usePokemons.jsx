import { useEffect, useReducer } from 'react'

const usePokemons = () => {
  const [getPokemons, setGetPokemons] = useReducer(
    (initState, state) => ({ ...initState, ...state }),
    { isLoading: false, isError: false, error: '', data: null }
  )

  const fetchPokemons = async () => {
    setGetPokemons({ isLoading: true })
    try {
      const result = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.')
      const data = await result.json()
      setGetPokemons({
        isLoading:false,
        data
      })
    } catch (error) {
      setGetPokemons({
        isLoading: false,
        isError: true,
        error,
      })
    }
  }

  useEffect(() => {
    fetchPokemons()
  }, [])

  return getPokemons
}

export default usePokemons

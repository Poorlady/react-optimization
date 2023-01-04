import { useEffect, useReducer } from 'react'

const usePokemons = (pageNum) => {
  const [getPokemons, setGetPokemons] = useReducer(
    (initState, state) => ({ ...initState, ...state }),
    {
      isLoading: false,
      isError: false,
      error: '',
      data: { count: null, next: null, previous: null, results: [] },
    }
  )

  const fetchPokemons = async () => {
    setGetPokemons({ isLoading: true })
    try {
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pageNum * 20}`
      )
      const fetchData = await result.json()
      setGetPokemons({
        isLoading: false,
        data: {
          ...getPokemons.data,
          ...fetchData,
          results: [
            ...getPokemons.data.results,
            ...fetchData.results.map((result) => ({
              ...result,
              id: parseInt(result.url.split('/')[6]),
            })),
          ],
        },
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
  }, [pageNum])

  return getPokemons
}

export default usePokemons

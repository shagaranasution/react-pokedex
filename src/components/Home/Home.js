import { useState, useEffect } from 'react'
import { getPokemons, getPokemon } from '../../services/pokemon'

const Home = () => {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    const fetchData = async () => {
      let response = await getPokemons(initialURL)
      
      await loadPokemon(response.results)
      setNextUrl(response.next)
      setPrevUrl(response.previous)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const loadPokemon = async (data) => {
    let pokemonData = await Promise.all(data.map(async (pokemon) => {
      let pokemonRecord = await getPokemon(pokemon.url)

      return pokemonRecord
    }))
    console.log(pokemonData)
    setPokemonData(pokemonData)
  }

  return (
    <div className="home">
      <h1>
        Welcome to My Page
      </h1>
      <p>
        Hello, I am Shagara
      </p>
    </div>
  )
}

export default Home
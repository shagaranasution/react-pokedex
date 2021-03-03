import { useState, useEffect } from 'react'
import { getPokemons, getPokemon } from '../../services/pokemon'

import Card from '../Card'

import './home.css'

const Home = () => {
  const [pokemonData, setPokemonData] = useState([])
  const [name, setName] = useState('')
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
    const pokemonData = await Promise.all(data.map(async (pokemon) => {
      const pokemonRecord = await getPokemon(pokemon.url)

      return pokemonRecord
    }))

    setPokemonData(pokemonData)
  }

  const handleChange = (e) => {
    setName(e.target.value.toLowerCase())
  }

  const handleSearch = async () => {
    const data = await getPokemon(initialURL + '/' + name)

    setIsLoading(true)

    if(!data.results) {
      setPokemonData([data])
      setNextUrl('')
      setPrevUrl('')
    } else {
      await loadPokemon(data.results)
      setNextUrl(data.next)
      setPrevUrl(data.previous)
    }
    
    setIsLoading(false)
  }

  const handleNext = async () => {
    if(!nextUrl) {
      return
    }

    setIsLoading(true)

    let data = await getPokemons(nextUrl)

    await loadPokemon(data.results)
    setNextUrl(data.next)
    setPrevUrl(data.previous)
    setIsLoading(false)
  }

  const handlePrev = async () => {
    if(!prevUrl) {
      return
    }

    setIsLoading(true)

    let data = await getPokemons(prevUrl)
    await loadPokemon(data.results)
    setNextUrl(data.next)
    setPrevUrl(data.previous)
    setIsLoading(false)
  }

  return (
    <div className="Home">
      <div className="Home__search">
        <input 
          type="text"
          placeholder="Type pokemon's name you are looking here"
          onChange={handleChange}
          />
        <button onClick={handleSearch}>
          Search
        </button>
      </div>
      {
        isLoading ? 
          <div className="Home__contents">
            {
              [...Array(4).keys()].map((value, idx) => {
                return (
                  <div className="loading-state" key={idx} />
                )
              })
            }
            {/* <div className="loading-state "/>
            <div className="loading-state "/>
            <div className="loading-state "/>
            <div className="loading-state "/> */}
          </div> :
          <div className="Home__contents">
            {
              pokemonData.map((pokemon) => {
                return  <Card key={pokemon.id} pokemon={pokemon} />
              })
            }
          </div>
      }
      <div className="Home__button">
        { prevUrl && <button onClick={handlePrev}>Prev</button> }
        { nextUrl && <button onClick={handleNext}>Next</button> }
      </div>
    </div>
  )
}

export default Home
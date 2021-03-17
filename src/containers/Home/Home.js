import { useState, useEffect } from 'react'
import { fetchData } from '../../services/pokemon'

import Card from '../../components/Card'
import ErrorPlaceholder from '../../components/ErrorPlaceholder'

import './home.css'

const Home = () => {
  const [pokemonData, setPokemonData] = useState([])
  const [name, setName] = useState('')
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetchData(initialURL)

        await loadPokemon(response.results)
        setNextUrl(response.next)
        setPrevUrl(response.previous)
        setIsLoading(false)
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  const loadPokemon = async (data) => {
    const pokemonData = await Promise.all(data.map(async (pokemon) => {
      const pokemonRecord = await fetchData(pokemon.url)

      return pokemonRecord
    }))
  
    setPokemonData(pokemonData)
  }

  const handleChange = (e) => {
    setName(e.target.value.toLowerCase())
  }

  const handleSearch = async (searchedName) => {
    const data = await fetchData(initialURL + '/' + searchedName)

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
    
    setName(searchedName)
    setIsLoading(false)
  }

  const handleNext = async () => {
    if(!nextUrl) {
      return
    }

    setIsLoading(true)

    let data = await fetchData(nextUrl)

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

    let data = await fetchData(prevUrl)
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
          value={name}
          onChange={handleChange}
          />
        <button className="Home__btn Home__btn-search" onClick={() => handleSearch(name)}>
          Search
        </button>
        <button className=" Home__btn Home__btn-reset" onClick={() => handleSearch('')}>
          Reset
        </button>
      </div>
      {error 
        && 
           <ErrorPlaceholder />
          }
          
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
          </div> :
          <div className="Home__contents">
            {
              pokemonData.map((pokemon) => {
                return <Card key={pokemon.id} pokemon={pokemon} />
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
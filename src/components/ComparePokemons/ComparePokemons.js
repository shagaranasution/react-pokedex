import { useState, useEffect } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { getPokemons, getPokemon } from '../../services/pokemon'

import NavBar from '../NavBar'
import PokemonStatistics from '../PokemonStatistics'

import './compare-pokemons.css'

const ComparePokemons = () => {
  const [firstPokemon, setFirstPokemon] = useState(null)
  const [secondPokemon, setSecondPokemon] = useState(null)
  const [firstPokemonSelected, setFirstPokemonSelected] = useState(null)
  const [secondPokemonSelected, setSecondPokemonSelected] = useState(null)

  useEffect(() => {

  }, [secondPokemon])

  const loadOptions = async (q, loadedOptions, { offset }) => {
    const URL = !!q ? `https://pokeapi.co/api/v2/pokemon/${q}` : `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
    let options = []
    const response = await getPokemons(URL)
    const hasMore = !!response.results

    if(!!response.results) {
      options = response.results.map((pokemon) => {
        return {
          value: pokemon.name,
          label: pokemon.name
        }
      })
    } else {
      options = [
        {
          value: response.name,
          label: response.name
        }
      ]
    }
  
    return {
      options,
      hasMore: hasMore,
      additional: {
        offset: offset + 20,
      },
    }
  }

  const handleChangeFirstPokemon = (value) => {
    if(value === firstPokemonSelected) {
      return
    }

    setFirstPokemonSelected(value)

    const fetchData = async () => {
      let data = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${value.label}`)

      setFirstPokemon(data)
    }

    fetchData()
  }

  const handleChangeSecondPokemon = (value) => {
    if(value === secondPokemonSelected) {
      return
    }

    setSecondPokemonSelected(value)

    const fetchData = async () => {
      let data = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${value.label}`)

      setSecondPokemon(data)
    }

    fetchData()
  }

  const renderPokemonDetail = (pokemon) => {
    return (
      <>
        <div className="ComparePokemons__image">
          <img src={pokemon.sprites.front_default} alt=""/>
        </div>
        <h2 className="ComparePokemons__name">{pokemon.name}</h2>
        <div className="ComparePokemons__stats">
          <PokemonStatistics statistics={pokemon.stats} />
        </div>
      </>
    )
  }

  return (
    <div className="ComparePokemons">
      <NavBar />
      <h2>Compare Pokemon</h2>
      <div className="ComparePokemons__contents">
        <AsyncPaginate
          value={firstPokemonSelected}
          loadOptions={loadOptions}
          onChange={handleChangeFirstPokemon}
          additional={{
            offset: 0,
          }}
        />
        <AsyncPaginate
          value={secondPokemonSelected}
          loadOptions={loadOptions}
          onChange={handleChangeSecondPokemon}
          additional={{
            offset: 0,
          }}
        />
        <div>
          {firstPokemon  && 
            renderPokemonDetail(firstPokemon)
          }
        </div>
        <div>
          {secondPokemon &&
            renderPokemonDetail(secondPokemon)
          }
        </div>
      </div>
    </div>
  )
}

export default ComparePokemons
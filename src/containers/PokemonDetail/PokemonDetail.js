import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../../services/pokemon'

import NavBar from '../../components/NavBar'
import PokemonStatistics from "../../components/PokemonStatistics";

import './pokemon-detail.css'

const PokemonDetail = () => {
  const { id } = useParams()

  const [pokemon, setPokemon] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const URL = 'https://pokeapi.co/api/v2/pokemon/' + id

  useEffect(() => {
    const getData = async () => {
      let data = await fetchData(URL)

      setPokemon(data)
      setIsLoading(false)
    }
    getData()
  }, [URL])

  return (
    <div className="Detail">
      <NavBar />
      {isLoading &&
        <div className='Detail__contents'>
          <div className='Detail__name loading-state'/>
          <div className='Detail__image loading-state' />
          <div className='Detail__stat loading-state'>
            <div className='Detail__stat-label loading-state'/>
            <div className="Detail__stat-bar loading-state"/>
          </div>
        </div>
      }
      {!isLoading && pokemon && 
        <div className='Detail__contents'>
          <h2 className='Detail__name'>{pokemon.name}</h2>
          <div className='Detail__image'>
            <img src={pokemon.sprites.front_default} alt=''/>
          </div>
          <div className='Detail__stat'>
            {
              <PokemonStatistics statistics={pokemon.stats} />
            }
          </div>
          <div className="Detail__devider">
            <hr/>
          </div>
          <h3>Profile</h3>
          <div className='Detail__profile-label'>Height</div>
          <div className='Detail__profile-dimension'>
            {pokemon.height * 10} Centimeters
          </div>
          <div className='Detail__profile-label'>Weight</div>
          <div className='Detail__profile-dimension'>
            {pokemon.weight * 0.1} Kilograms
          </div>
          <div className='Detail__profile-label'>Types</div>
          {
            pokemon.types.map((type) => {
              const name = type.type.name

              return(
                  <span className='Detail__profile-type' key={name}>{name}</span>
              ) 
            })
          }
        </div>
        }
    </div>
  )
}

export default PokemonDetail
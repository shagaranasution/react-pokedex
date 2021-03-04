import React from 'react'

import './pokemon-statistics.css'

const PokemonStatistics = (props) => {
  const {statistics} = props

  return (
    <div className='PokemonStatistics'>
      {
        statistics.map((statistic) => {
          return (
            <React.Fragment key={statistic.stat.name}>
              <div className='PokemonStatistics__label'>{statistic.stat.name}</div>
              <div className="PokemonStatistics__bar">{statistic.base_stat}/100</div>
            </React.Fragment>
          )
        })
      }
    </div>
  )
}

export default PokemonStatistics
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


import './pokemon-detail.css'

const PokemonDetail = () => {
  return (
    <div className="Detail">
      <Link to="/">
        <p className="Detail__back">
          Back
        </p>
      </Link>
      Detail Page
    </div>
  )
}

export default PokemonDetail
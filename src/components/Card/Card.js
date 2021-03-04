import { Link } from 'react-router-dom'

import './card.css'

const Card = (props) => {
  const {pokemon} = props

  return (
    <Link to={`/detail/${pokemon.id}`}>
      <div className="Card">
          <div className="Card__image">
            <img src={pokemon.sprites.front_default} alt='' />
          </div>
          <div className="Card__name">
            {pokemon.name}
          </div>
      </div>
    </Link>
  )
}

export default Card
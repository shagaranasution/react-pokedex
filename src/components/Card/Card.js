import './card.css'

const Card = (props) => {
  const {pokemon} = props

  return (
    <div className="Card">
      <div className="Card__image">
        <img src={pokemon.sprites.front_default} alt='' />
      </div>
      <div className="Card__name">
        {pokemon.name}
      </div>
    </div>
  )
}

export default Card
import { Link } from 'react-router-dom'

import './navbar.css'

const NavBar = () => {
  return (
    <div className="NavBar">
      <Link to="/">
        Home
      </Link>
      <Link to="/compare">
        Compare Pokemons
      </Link>
    </div>
  )
}

export default NavBar
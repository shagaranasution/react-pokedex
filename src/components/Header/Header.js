import { Link } from 'react-router-dom'

import './header.css'

const Header = () => {
  return (
    <div className="Header">
      <div className="Header__contents">
        <Link to="/">
          <h1>Pokedex</h1>
        </Link>
      </div>
    </div>
  )
}

export default Header
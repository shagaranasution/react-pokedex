import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import PokemonDetail from './components/PokemonDetail'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <div className="content">
              <Home />
            </div>
          </Route>
          <Route path="/detail/:id">
            <div className="content">
              <PokemonDetail />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

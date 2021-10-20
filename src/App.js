import React from 'react'
import{
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Layout from './layout/Layout'
import Landing from './components/pages/Landing'
import Pokedex from './components/pages/Pokedex'
import Create from './components/pages/Create'
import Detail from './components/pages/Detail'

import './App.css';

function App() {
  return (
      <Router>
      <Switch>
            <Route exact path={'/'} component={Landing} hideMenuBar={true}></Route>
        <Layout>
            <Route path={'/pokedex'} component={Pokedex}></Route>
            <Route path={'/create'} component={Create}></Route>
            <Route path={'/pokemon/:id'} component={Detail}></Route>
        </Layout>
        </Switch>
      </Router>
  );
}

export default App;

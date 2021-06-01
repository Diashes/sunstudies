import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from './components/Admin';
import Edit from './components/Edit';
import Home from './components/Home';
import Show from './components/Show';
import New from './components/New';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Sunstudies</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <main>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/admin"><Admin /></Route>
          <Route path="/show/:id"><Show /></Route>
          <Route path="/edit/:id"><Edit /></Route>
          <Route path="/new"><New /></Route>
        </Switch>
      </main>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

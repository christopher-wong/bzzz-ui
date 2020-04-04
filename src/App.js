import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'


import Home from './Home'
import Host from './Host'
import Join from './Join'

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">
          Bzzz
        </Link>
        </Navbar.Brand>
      </Navbar>
      <Switch>
        <Route path="/join" component={Join}/>
        <Route path="/host" component={Host}/>
        <Route path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

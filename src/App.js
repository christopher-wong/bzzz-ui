import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components';

import Home from './Home'
import Host from './Host'
import Join from './Join'

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;

    &:hover {
      text-decoration: none;
      color: #3498db
  }
`

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <StyledLink to="/">
          Bzzz
        </StyledLink>
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

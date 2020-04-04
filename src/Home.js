import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Button from "react-bootstrap/Button";

const Container = styled.div`
  margin: 1em;
`

class Home extends React.PureComponent {
  render() {
    return (
      <Container>
        <h1>Hello World</h1>
        <Link to="/join">
          <Button variant="primary" block>
            Join
          </Button>
        </Link>
        <Link to="/host">
          <Button variant="secondary" block>
            Host
          </Button>
        </Link>
    </Container>
    )
  }
}

export default Home;
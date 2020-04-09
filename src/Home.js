import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Button from "react-bootstrap/Button";

const Container = styled.div`
  margin: 1em;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;

    &:hover {
      text-decoration: none;
  }
`

class Home extends React.PureComponent {
  render() {

    return (
      <Container>
        <StyledLink to="/join">
          <Button variant="primary" size="lg" block>
            Join
          </Button>
        </StyledLink>
        <br />
        <StyledLink to="/host">
          <Button variant="secondary" size="lg" block>
            Host
          </Button>
        </StyledLink>
    </Container>
    )
  }
}

export default Home;
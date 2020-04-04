import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    margin: 1em;
`

const PlayersBuzzedList = styled.ol`
    list-style-type: none;
`

const PlayersConnectedList = styled.ol`
    list-style-type: none;
`

const GameCodeContainer = styled.div``
const ControlContainer = styled.div``
const PlayersBuzzedContainer = styled.div``
const PlayersConnected = styled.div``

class Host extends React.PureComponent {
    render() {
        let code = Math.floor(Math.random()*90000) + 10000;

        return (
            <Container>
                <GameCodeContainer>
                    Game Code: {code}
                </GameCodeContainer>
                <ControlContainer>
                    <Button variant="danger" block>
                        Reset all buzzers
                    </Button>
                    <Button variant="warning" block>
                        Toggle Lock
                        {' '}
                        <FontAwesomeIcon icon={faUnlock} />
                    </Button>
                </ControlContainer>
                <PlayersBuzzedContainer>
                    <h2>
                        Players Buzzed
                    </h2>
                    <PlayersBuzzedList>
                        <li>Christopher</li>
                    </PlayersBuzzedList>
                </PlayersBuzzedContainer>
                <PlayersConnected>
                    <h2>
                        Players Connected
                    </h2>
                    <PlayersConnectedList>
                        <li>Christopher</li>
                        <li>Paulina</li>
                    </PlayersConnectedList>
                </PlayersConnected>
            </Container>
        )
    }
}

export default Host;
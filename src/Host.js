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

    constructor(props) {
        super(props)

        this.state = {
            gameCode: null,
        }
    }

    async componentDidMount() {
        const response = await fetch(`https:localhost:8080/host`, {
            method: 'POST',
        })
        const json = await response.json()
        
        this.setState({
            ...this.state,
            ...json,
        })

        const { gameCode } = this.state;

        this.eventSource = new EventSource(`https://localhost:8080/host/${gameCode}`);
        
        this.eventSource.onmessage = e => (
            this.updateHostState(JSON.parse(e.data))
        )

        this.eventSource.onerror = e => {
            console.log(e)
        }
    }

    componentWillUnmount() {
        this.eventSource.close()
    }

    createGame = () => {

    }

    updateHostState = (hostState) => {
        console.log(hostState)
    }

    render() {
        const { gameCode } = this.state

        return (
            <Container>
                <GameCodeContainer>
                    Game Code: {gameCode}
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
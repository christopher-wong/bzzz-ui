import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    margin: 1em;
`

const PlayersBuzzedList = styled.ol``

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
            connected: [],
            buzzed: [],
        }
    }

    handleToggleLock = async (e) => {
        e.preventDefault()

        const { gameCode } = this.state;

        await fetch(`https://localhost:8080/host/${gameCode}/lock`, {
            method: "POST",
        })

        this.setState({
            ...this.state,
            buzzed: []
        })
    }

    handleResetBuzzers = async (e) => {
        e.preventDefault()

        const { gameCode } = this.state;

        await fetch(`https://localhost:8080/host/${gameCode}/reset`, {
            method: "POST",
        })

        this.setState({
            ...this.state,
            buzzed: []
        })
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
        if (hostState.action === "joined") {
            this.setState({
                ...this.state,
                connected: [...this.state.connected, {
                    playerName: hostState.playerName,
                    playerID: hostState.playerID,
                    time: hostState.time,
                }]
            })
        } else if (hostState.action === "buzz") {
            this.setState({
                ...this.state,
                buzzed: [...this.state.buzzed, {
                    playerName: hostState.playerName,
                    playerID: hostState.playerID,
                    time: hostState.time
                }]
            })
        } else if (hostState.action === "disconnect") {
            this.setState({
                ...this.state,
                // remove the player who disconnected from the game
                connected: this.state.connected.filter(player => player.playerID !== hostState.playerID)
            })
        }
    }

    render() {
        const { gameCode, connected, buzzed } = this.state

        const renderConnectedList = connected.map(player => <li key={player.playerID + player.time}>{player.playerName}</li>)
        const renderBuzzedList = buzzed.map(player => <li key={player.playerID + player.time}>{player.playerName}</li>)
        
        return (
            <Container>
                <GameCodeContainer>
                    <h1>Game Code: <code>{gameCode}</code></h1>
                </GameCodeContainer>
                <ControlContainer>
                    <Button variant="danger" onClick={this.handleResetBuzzers} block>
                        Reset all buzzers
                    </Button>
                    <Button variant="warning" onClick={this.handleToggleLock} block>
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
                        {renderBuzzedList}
                    </PlayersBuzzedList>
                </PlayersBuzzedContainer>
                <PlayersConnected>
                    <h2>
                        Players Connected
                    </h2>
                    <PlayersConnectedList>
                        {renderConnectedList}
                    </PlayersConnectedList>
                </PlayersConnected>
            </Container>
        )
    }
}

export default Host;
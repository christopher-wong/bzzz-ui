import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import UIfx from 'uifx';
import mp3File from './static/beep.mp3';

import styled from 'styled-components';

import getConfig from "./config";

const Container = styled.div`
    margin: 1em;
`

const Buzzer = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    font-size: 150px;
    border-radius: 50%;
    -webkit-appearance: button;

    &:hover {
        box-shadow: 0 0 0 3px #27ae60;
    }
`

const ActivatedBuzzer = styled.button`
    background-color: #c0392b;
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    font-size: 150px;
    border-radius: 50%;
    -webkit-appearance: button;
`

const LockedBuzzer = styled.button`
    background-color: #f1c40f;
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    font-size: 150px;
    border-radius: 50%;
    -webkit-appearance: button;
`

const beep = new UIfx(
    mp3File,
    {
        volume: 1,
    }
);


class Join extends React.PureComponent {
    constructor(props) {
        super(props)
        
        this.state = {
            gameCode: null,
            userID: null,
            buzzed: false,
            formGameCode: undefined,
            formName: "",
            locked: false,
        }
    }

    componentWillUnmount() {
        this.eventSource && this.eventSource.close()
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value,
        })
    }

    handleBuzzer = async (e) => {
        beep.play()
        e.preventDefault()

        const { gameCode, userID } = this.state

        await fetch(`/api/play/${gameCode}/buzz`, {
            method: 'POST',
            body: JSON.stringify({
                "gameID": gameCode,
                "playerID": userID,
                "action": "buzz",
            })
        })

        this.setState({
            ...this.state,
            buzzed: true,
        })
    }

    initEventSource = (formGameCode, formName) => {
        this.eventSource = new EventSource(`/api/play/${formGameCode}?name=${formName}`)

        this.eventSource.onmessage = e => {
            this.updateGameState(JSON.parse(e.data))
        }

        this.eventSource.onerror = e => {
            console.log(e)
        }
    }

    updateGameState = data => {
        const { locked } = this.state;

        console.log(data)
 
        if (data.action === "reset") {
            this.setState({
                ...this.state,
                buzzed: false,
            })
        } else if(data.action === "lock") {
            this.setState({
                ...this.state,
                locked: !locked,
                buzzed: false,
            })
        } else if (data.action === "buzz") {
            // do nothing
        } else if (data.action === "disconnect") {
            this.setState({
                ...this.state,
                gameCode: null,
                formGameCode: undefined,
                formName: "",
            })
        } else {
            this.setState({
                ...this.state,
                gameCode: data.gameID,
                userID: data.playerID,
            })
        }
    }

    handleJoin = (e) => {
        e.preventDefault()

        const { formGameCode, formName } = this.state

        this.initEventSource(formGameCode, formName)
    }

    render() {
        const { gameCode, buzzed, formGameCode, formName, locked } = this.state;

        // if we haven't joined a game yet, render the join game form
        if (!gameCode) {
            return (
                <Container>
                    <Form>
                        <Form.Group controlId="formGameCode">
                            <Form.Label>Game Code:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="967532"
                                min={100000}
                                max={999999}
                                onChange={this.handleChange}
                                value={formGameCode}
                                required
                            />
                        </Form.Group>
    
                        <Form.Group controlId="formName">
                            <Form.Label>Your Name:</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Christopher"
                                minLength={3}
                                maxLength={32}
                                onChange={this.handleChange}
                                value={formName}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleJoin}>
                            Join
                        </Button>
                    </Form>
                </Container>
            )
        }

        let buzzerRender;

        if (locked) {
            buzzerRender = (
                <LockedBuzzer>
                    Bzz
                </LockedBuzzer>
            )
        } else if (buzzed) {
            buzzerRender = (
                <ActivatedBuzzer onClick={this.handleBuzzer} disabled>
                    Bzz
                </ActivatedBuzzer>
            )
        } else {
            buzzerRender = (
                <Buzzer onClick={this.handleBuzzer}>
                    Bzz
                </Buzzer>
            )
        }

        return (
            <Container>
                <h3>Game Code: {gameCode}</h3>
                { buzzerRender }
            </Container>
        )
    }
}

export default Join;
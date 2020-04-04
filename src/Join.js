import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import styled from 'styled-components';

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
    font-size: 500px;
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
    font-size: 500px;
    border-radius: 50%;
    -webkit-appearance: button;
`

const LockedBuzzer = styled.button`
    background-color: #c0392b;
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    font-size: 500px;
    border-radius: 50%;
    -webkit-appearance: button;
`

class Join extends React.PureComponent {
    state = {
        gameCode: 123456,
        buzzed: false,
    }

    handleBuzzer = (e) => {
        e.preventDefault()

        this.setState({
            buzzed: true,
        })
    }

    render() {
        const { gameCode, buzzed } = this.state;

        // if we haven't joined a game yet, render the join game form
        if (!gameCode) {
            return (
                <Container>
                    <Form>
                        <Form.Group controlId="formGameCode">
                            <Form.Label>Game Code:</Form.Label>
                            <Form.Control type="number" placeholder="96753" min={100000} max={999999} required/>
                        </Form.Group>
    
                        <Form.Group controlId="formName">
                            <Form.Label>Your Name:</Form.Label>
                            <Form.Control type="name" placeholder="Christopher" minLength={3} maxLength={32} required/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Join
                        </Button>
                    </Form>
                </Container>
            )
        }

        return (
            <Container>
                <h3>Game Code: {gameCode}</h3>
                
                {
                    buzzed ?
                        <ActivatedBuzzer onClick={this.handleBuzzer} disabled />
                        : <Buzzer onClick={this.handleBuzzer} />
                }
            </Container>
        )
    }
}

export default Join;
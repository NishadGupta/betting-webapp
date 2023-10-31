import { useEffect, useState } from "react";
import {TextField, Button} from "@mui/material";
import { socket } from "../socket";

export const PlaceBet = ({userData, joinedRoom}) =>{
    const [bet, setBet] = useState(-1);
    const [continueGame, setContinueGame] = useState(false);
    const [lostGame, setLostGame] = useState(false);
    const [wonGame, setWonGame] = useState(false);
    const [userWinnings, setUserWinnings] = useState(null);
    
    const handleBetValue = (event)=>{
        setBet(event.target.value);
        setContinueGame(true);
    }
    const setBetValue = (value) => {
        setBet(value)
    }
    const handlePlaceBet = () => {
        const playerBetDeets = {
            'game_uuid': joinedRoom.game_uuid,
            'uuid':userData.uuid,
            'bet':parseInt(bet),
        }
        socket.emit('place_bets',playerBetDeets);
        setBetValue(0)
    }
    useEffect(()=>{
        function onContinue(value){
            console.log(`RoundContinued for ${userData.uuid}`);
            console.log(value);
            setContinueGame(true);
            setLostGame(false);
            setWonGame(false);
        }
        function onWinner(value){
            console.log(`Round won by ${userData.uuid}`);
            console.log(value);
            setContinueGame(false);
            setLostGame(false);
            setWonGame(true);
            setUserWinnings(value);
        }
        function onLost(value){
            console.log(`Round lost by ${userData.uuid}`);
            console.log(value);
            setContinueGame(false);
            setLostGame(true);
            setWonGame(false);
        }
        socket.on('continue-game',onContinue);
        socket.on('winner',onWinner);
        socket.on('lost',onLost);
        return ()=>{
            socket.off('continue-game', onContinue);
            socket.off('winner', onWinner);
            socket.off('lost', onLost);
        };
    },[continueGame, lostGame, wonGame])
    return(<>
    {continueGame ?
        <div>
            <h1>You've joined Room: {joinedRoom.game_uuid}</h1>
            <TextField
                placeholder='Place Bet value'
                value={bet}
                name='betValue'
                onChange={handleBetValue}
            />
            <Button type="submit" onClick={handlePlaceBet}>Submit</Button>
        </div>
    : lostGame ?
        <div>
            <h1>Sorry You've lost the game, better luck next time</h1>
        </div>
    : wonGame ?
        <div>
            <h1>Congratulations you've won the game!</h1>
        </div>
    : <div>
        <h1>Continue: {joinedRoom.game_uuid}</h1>
        <TextField
            placeholder='Place Bet value'
            value={bet}
            name='betValue'
            onChange={handleBetValue}
        />
        <Button type="submit" onClick={handlePlaceBet}>Submit</Button>
    </div>
    }
    </>);
}
import { useEffect, useState } from "react";
import {TextField, Button} from "@mui/material";
import { socket } from "../socket";

export const PlaceBet = ({userData, joinedRoom}) =>{
    const [bet, setBet] = useState(-1);
    const [continueGame, setContinueGame] = useState(null);
    const [lostGame, setLostGame] = useState(null);
    const [wonGame, setWonGame] = useState(null);
    const [userWinnings, setUserWinnings] = useState(null);
    
    const handleBetValue = (event)=>{
        setBet(event.target.value);
        setContinueGame(true);
    }
    const handlePlaceBet = (event) => {
        event.preventDefault();
        const playerBetDeets = {
            'game_uuid': joinedRoom.game_uuid,
            'uuid':userData.uuid,
            'bet':parseInt(bet),
        }
        socket.emit('place_bets',playerBetDeets);
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
    },[])
    return(<>
    <div>
        <h1>You've joined Room: {joinedRoom.game_uuid}</h1>
        <form onSubmit={handlePlaceBet}>
            <TextField
            placeholder='Place Bet value'
            value={bet}
            name='betValue'
            onChange={handleBetValue}
          />
          <Button type="submit">Submit</Button>
        </form>
    </div>
    </>);
}
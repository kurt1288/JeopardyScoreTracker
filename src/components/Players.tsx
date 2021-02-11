import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addPlayer, nextRound } from '../store/reducer';

const Players = () => {
    const [player, setPlayer] = useState('');
    const dispatch = useDispatch();
    const { players } = useSelector((state: RootState) => state);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && player.trim().length > 0) {
            dispatch(addPlayer(player));
            setPlayer('');
        }
    }

    return (
        <React.Fragment>
            <h1>Jeopardy Scorecard</h1>
            <h2>Players</h2>
            <div>
                {players.map((player, index) => (
                    <p key={index}>{player.name}</p>
                ))}
            </div>
            <input type="text" id="newPlayerName" placeholder="Player's name" value={player} onInput={e => setPlayer(e.currentTarget.value)} onKeyPress={handleKeyPress} />
            <button type="button" id="startGame" onClick={() => dispatch(nextRound())} disabled={players.length === 0}>PLAY JEOPARDY!</button>
        </React.Fragment>
    )
}

export default Players;
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { givePointsToPlayer, changePointSelected } from "../store/reducer";

const AwardPoints = () => {
    const dispatch = useDispatch();
    const [subtract, setSubtract] = useState(1);
    const { players, pointSelected } = useSelector((state: RootState) => state);
    
    return (
        <div id="playerCards">
            <div>
                {players.map((player, index) => (
                    <button className="playerCard" key={index} onClick={() => dispatch(givePointsToPlayer({player: player, points: pointSelected * subtract}))} >{ player.name }</button>
                ))}
            </div>
            <input type="checkbox" id="subtractPoints" />
            <label htmlFor="subtractPoints" onClick={() => setSubtract(subtract * -1)}>Subtract</label>
            <button id="goBack" onClick={() => dispatch(changePointSelected(0))}>Go Back</button>
        </div>
    );
}

export default AwardPoints;
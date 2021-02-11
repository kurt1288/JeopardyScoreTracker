import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Scoreboard = () => {
    const { players } = useSelector((state: RootState) => state);
    const [collapsed, setCollapsed] = useState(true);
    
    return (
        <div id="scoreboard" className={collapsed ? 'collapsed' : ''} onClick={() => setCollapsed(!collapsed)} role="button">
            <div id="scores">
                {players.map((player, index) => (
                    <p key={index}>{ player.name }: { player.score }</p>
                ))}
            </div>
            <div id="points">
                {players.map(player => (
                    <div>
                        { player.points.map((obj, index) => (
                            <div>
                                <p>Round {index + 1}</p>
                                <ul>
                                    { Object.entries(obj).map(x => (
                                        <li>{x[0]}: {x[1]}</li>
                                    )) }
                                </ul>
                            </div>
                        )) }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Scoreboard;
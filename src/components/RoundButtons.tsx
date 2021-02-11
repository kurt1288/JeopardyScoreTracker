import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { nextRound, previousRound, newGame } from "../store/reducer";

const RoundButtons = () => {
    const dispatch = useDispatch();
    const { round } = useSelector((state: RootState) => state);

    const nextButton = () => {
        if (round <= 3)
            return (<button type="button" id="next" onClick={() => dispatch(nextRound())}>Next</button>);
        else
            return (<button type="button" id="next" onClick={() => dispatch(newGame())}>New Game</button>)
    }
    
    return (
        <div id="roundButtons">
            <button type="button" id="previous" onClick={() => dispatch(previousRound())} disabled={round <= 1}>Previous</button>
            {nextButton()}
        </div>
    )
}

export default RoundButtons;
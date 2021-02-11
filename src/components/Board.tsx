import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { changePointSelected } from "../store/reducer";

const Board = () => {
    const dispatch = useDispatch();
    const { round } = useSelector((state: RootState) => state);

    const points = [ [200, 400, 600, 800, 1000], [400, 800, 1200, 1600, 2000], [5000] ];

    return (
        <React.Fragment>
            {points[round - 1].map((point, index) => (
                <button className="points" key={index} type="button" value={point} onClick={() => dispatch(changePointSelected(point))}>{ point }</button>
            ))}
        </React.Fragment>
    )
}

export default Board;
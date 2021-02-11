import Players from './components/Players';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Board from './components/Board';
import AwardPoints from './components/AwardPoints';
import React from 'react';
import Scoreboard from './components/Scoreboard';
import RoundButtons from './components/RoundButtons';

const App = () => {
  const { round, pointSelected } = useSelector((state: RootState) => state);

  const display = () => {
    if (round === 0)
      return <Players />;
    else if (pointSelected > 0)
      return <AwardPoints />;
    else
      return (
        <React.Fragment>
          <Scoreboard />
          { round <= 3 && <Board /> }
          <RoundButtons />
        </React.Fragment>
      );
  }

  return (
    <React.Fragment>
      {display()}
    </React.Fragment>
  )
}

export default App;
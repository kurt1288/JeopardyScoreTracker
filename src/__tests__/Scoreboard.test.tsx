import * as redux from 'react-redux';
import Scoreboard from '../components/Scoreboard';
import { fireEvent, render } from '@testing-library/react';

const useSelectorMock = jest.spyOn(redux, 'useSelector');
const useDispatchMock = jest.spyOn(redux, 'useDispatch');

const players = [{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}];

beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
});

test("shows score", () => {
    useSelectorMock.mockReturnValue({players: players});

    const screen = render(<Scoreboard />);

    expect(screen).toMatchSnapshot();
});

test("shows full scoreboard", () => {
    useSelectorMock.mockReturnValue({players: players});

    const screen = render(<Scoreboard />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("button")).toBeInTheDocument();
});
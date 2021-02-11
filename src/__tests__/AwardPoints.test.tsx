import * as redux from 'react-redux';
import AwardPoints from '../components/AwardPoints';
import { render, screen, fireEvent } from '@testing-library/react';

const useSelectorMock = jest.spyOn(redux, 'useSelector');
const useDispatchMock = jest.spyOn(redux, 'useDispatch');

const players = [{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}];

beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
});

test("shows the award points screen", () => {
    useSelectorMock.mockReturnValue({players:players, pointSelected: 200});

    const board = render(<AwardPoints />);
    fireEvent.click(screen.getByText(/subtract/i));

    expect(board).toMatchSnapshot();
});
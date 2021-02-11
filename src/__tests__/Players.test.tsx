import * as redux from 'react-redux';
import Players from '../components/Players';
import { render } from '@testing-library/react';

const useSelectorMock = jest.spyOn(redux, 'useSelector');
const useDispatchMock = jest.spyOn(redux, 'useDispatch');

const players = [{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}];

beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
});

test("show player screen with 2 players", () => {
    useSelectorMock.mockReturnValue({players:players});

    const screen = render(<Players />);

    expect(screen).toMatchSnapshot();
});
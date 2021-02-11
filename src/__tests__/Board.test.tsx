import * as redux from 'react-redux';
import Board from '../components/Board';
import { render } from '@testing-library/react';

const useSelectorMock = jest.spyOn(redux, 'useSelector');
const useDispatchMock = jest.spyOn(redux, 'useDispatch');

beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
});

test("displays first round points", () => {
    useSelectorMock.mockReturnValue({round:1});

    const board = render(<Board />);

    expect(board).toMatchSnapshot();
});

test("displays second round points", () => {
    useSelectorMock.mockReturnValue({round:2});

    const board = render(<Board />);

    expect(board).toMatchSnapshot();
});

test("displays third round points", () => {
    useSelectorMock.mockReturnValue({round:3});

    const board = render(<Board />);

    expect(board).toMatchSnapshot();
})
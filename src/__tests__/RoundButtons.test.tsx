import * as redux from 'react-redux';
import RoundButtons from '../components/RoundButtons';
import { render } from '@testing-library/react';

const useSelectorMock = jest.spyOn(redux, 'useSelector');
const useDispatchMock = jest.spyOn(redux, 'useDispatch');

beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
});

test("round 1 show next and previous buttons", () => {
    useSelectorMock.mockReturnValue({round: 1});

    const screen = render(<RoundButtons />);

    expect(screen).toMatchSnapshot();
});

test("round 2 show next and previous buttons", () => {
    useSelectorMock.mockReturnValue({round: 2});

    const screen = render(<RoundButtons />);

    expect(screen).toMatchSnapshot();
});

test("round 3 show next and previous buttons", () => {
    useSelectorMock.mockReturnValue({round: 3});

    const screen = render(<RoundButtons />);

    expect(screen).toMatchSnapshot();
});

test("after game shows new game button", () => {
    useSelectorMock.mockReturnValue({round: 4});

    const screen = render(<RoundButtons />);

    expect(screen).toMatchSnapshot();
});
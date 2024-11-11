import Home from '../src/screens/Home/HomeScreen';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

describe('Test for the home screen', () => {
  it('Should test for the header', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Home navigation={{replace: jest.fn()}} />
      </NavigationContainer>,
    );

    expect(getByText("My Pets")).toBeTruthy()
  });
});

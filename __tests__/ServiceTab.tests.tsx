import { render,fireEvent, screen } from '@testing-library/react-native';
import Services from '../src/tabs/Services/ServiceTab';
import {NavigationContainer} from '@react-navigation/native';

global.fetch = jest.fn();

describe('Tests for service Tab', () => {
  it('Should test for heading', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Services/>
      </NavigationContainer>,
    );

    expect(getByText('Hello, How may I help you?')).toBeTruthy()
    expect(getByText('Veternity')).toBeTruthy()
    expect(getByText('Baording')).toBeTruthy()
    expect(getByText('Grooming')).toBeTruthy()
    expect(getByText('Training')).toBeTruthy()

  });
  it('Should test for images', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Services/>
      </NavigationContainer>,
    );

    expect(getByTestId("vaternity-image")).toBeTruthy()
  });
});

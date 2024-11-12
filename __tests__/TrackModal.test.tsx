import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Track from '../src/components/TrackModal';

describe('Track Component', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };
  const mockCloseFn = jest.fn();

  const pet = { name: 'Buddy' }; 

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render modal when visible is true', () => {
    const { getByText } = render(
      <Track navigation={mockNavigation} visible={true} closeFn={mockCloseFn} pet={pet} />
    );

    expect(getByText('Activity')).toBeTruthy();
    expect(getByText('Reminders')).toBeTruthy();
  });

  it('should call closeFn and navigates to "Activity" screen when Activity button is pressed', () => {
    const { getByText } = render(
      <Track navigation={mockNavigation} visible={true} closeFn={mockCloseFn} pet={pet} />
    );

    fireEvent.press(getByText('Activity'));
    expect(mockCloseFn).toHaveBeenCalled();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Activity', {"pet": {"name": "Buddy"}});
  });

  it('should call closeFn and navigates to "Reminders" screen when Reminders button is pressed', () => {
    const { getByText } = render(
      <Track navigation={mockNavigation} visible={true} closeFn={mockCloseFn} pet={pet} />
    );

    fireEvent.press(getByText('Reminders'));
    expect(mockCloseFn).toHaveBeenCalled();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Reminders', {"pet": {"name": "Buddy"}});
  });

  it('does not render modal content when visible is false', () => {
    const { queryByText } = render(
      <Track navigation={mockNavigation} visible={false} closeFn={mockCloseFn} pet={pet} />
    );
    expect(queryByText('Activity')).toBeNull();
    expect(queryByText('Reminders')).toBeNull();
  });
});

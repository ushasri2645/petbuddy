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

  it('does not render modal content when visible is false', () => {
    const { queryByText } = render(
      <Track navigation={mockNavigation} visible={false} closeFn={mockCloseFn} pet={pet} />
    );
    expect(queryByText('Activity')).toBeNull();
    expect(queryByText('Reminders')).toBeNull();
  });
});

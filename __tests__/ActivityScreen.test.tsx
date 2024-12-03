import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {Alert} from 'react-native';
import Activity from '../src/screens/Activity/ActivityScreen';

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

const mockPet = {
  name: 'Buddy',
  image_uri: 'image.jpg',
};

const mockActivities = [
  {
    title: 'Morning Walk',
    date: '2024-11-30T00:00:00Z',
    startTime: '2024-11-30T06:00:00Z',
    endTime: '2024-11-30T07:00:00Z',
  },
  {
    title: 'Evening Walk',
    date: '2024-11-30T00:00:00Z',
    startTime: '2024-11-30T18:00:00Z',
    endTime: '2024-11-30T19:00:00Z',
  },
  {
    title: 'Sleep Time',
    date: '2024-11-30T00:00:00Z',
    startTime: '2024-11-30T00:00:00Z',
    endTime: '2024-11-30T01:00:00Z',
  },
];

global.fetch = jest.fn();

describe('Activity Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('renders activities correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockActivities),
    });
    render(<Activity route={{params: {pet: mockPet}}} />);
    await waitFor(() => {
      expect(screen.getByText('Morning Walk')).toBeTruthy();
    });
    expect(screen.getByText('On 30 Nov 2024 - 6:00 AM - 7:00 AM')).toBeTruthy();
    expect(screen.getByText('On 30 Nov 2024 - 6:00 PM - 7:00 PM')).toBeTruthy();
    expect(screen.getByText('On 30 Nov 2024 - 12:00 AM - 1:00 AM')).toBeTruthy();
  });

  it('renders "No Activities found" when activities are empty', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<Activity route={{params: {pet: mockPet}}} />);
    await waitFor(() => {
      expect(screen.getByText('No Activities found')).toBeTruthy();
    });
  });

  it('displays an alert on fetch failure', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<Activity route={{params: {pet: mockPet}}} />);
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Something Went Wrong');
    });
  });

  it('displays an alert when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<Activity route={{params: {pet: mockPet}}} />);
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Failed to fetch');
    });
  });

  it('renders default image when pet image URI is not provided', async () => {
    const petWithoutImage = {name: 'Buddy', image_uri: ''};
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockActivities),
    });

    render(<Activity route={{params: {pet: petWithoutImage}}} />);
    const defaultImage = screen.getByTestId('default-image');
    expect(defaultImage).toBeTruthy();
  });

  it('renders custom image when pet image URI is provided', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockActivities),
    });

    render(<Activity route={{params: {pet: mockPet}}} />)
    const customImage = screen.getByTestId('custom-image');
    expect(customImage).toBeTruthy();
  });
});

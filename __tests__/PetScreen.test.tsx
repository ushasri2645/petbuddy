import { Alert, Linking, Platform } from 'react-native';
import PetScreen from '../src/screens/PetScreen/PetScreen';
import {fireEvent, render, screen, waitFor} from '@testing-library/react-native';
import * as Permissions from './../src/components/Permissions'
import Track from '../src/components/TrackModal';

jest.mock('react-native-permissions', () => ({
  check: jest.fn(() => Promise.resolve('granted')),
  request: jest.fn(() => Promise.resolve('granted')),
  PERMISSIONS: {
    IOS: {
      PHOTO_LIBRARY: 'ios.permission.PHOTO_LIBRARY',
    },
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
  },
}));

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));


jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn(() =>
    Promise.resolve({path: '/mock/path', mime: 'image/jpeg'}),
  ),
  openCamera: jest.fn(() =>
    Promise.resolve({path: '/mock/path', mime: 'image/jpeg'}),
  ),
  clean: jest.fn(() => Promise.resolve()),
  cleanSingle: jest.fn(() => Promise.resolve()),
}));

jest.mock('./../src/components/Permissions', () => ({
  requestCallPermission: jest.fn(),
}));

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));



Alert.alert = jest.fn()

describe('Pet Screen Tests', () => {
  const mockNavigation = {goBack: jest.fn(), setOptions: jest.fn()};
  const mockRoute = {
    params: {
      pet: {
        name: 'Buddy',
        age: 3,
        weight: 15,
        height: 50,
        color: 'Brown',
        remarks: 'Friendly dog',
      },
    },
  };

  it('should render all pet details correctly', () => {
    const {getByText, getByTestId} = render(
      <PetScreen navigation={mockNavigation} route={mockRoute} />,
    );
    expect(getByText('Buddy')).toBeTruthy();
    expect(getByText('Age')).toBeTruthy();
    expect(getByText('Height')).toBeTruthy();
    expect(getByText('Weight')).toBeTruthy();
    expect(getByText('Color')).toBeTruthy();
    expect(getByText('Remarks')).toBeTruthy();
    expect(getByText('Gallery  >')).toBeTruthy();
    expect(getByText('Track')).toBeTruthy();
    expect(getByTestId('no-dog-image')).toBeTruthy();
  });
});

describe('PetScreen Layout', () => {
  const mockNavigation = {
    goBack: jest.fn(),
    setOptions: jest.fn(),
  };

  const mockRoute = {
    params: {
      pet: {
        name: 'Buddy',
        breed: 'Labrador',
        gender: 'Male',
        age: 3,
        weight: 20,
        height: 50,
        color: 'Brown',
        image_uri:'',
        emergencyContact:'1234567890',
        remarks: 'Very playful!',
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set navigation options with custom back button on mount', () => {
    render(<PetScreen navigation={mockNavigation} route={mockRoute} />);
    expect(mockNavigation.setOptions).toHaveBeenCalledWith(
      expect.objectContaining({
        headerShown: true,
        headerTitle: '',
      }),
    );
    const headerLeft = mockNavigation.setOptions.mock.calls[0][0].headerLeft;
    expect(typeof headerLeft).toBe('function');
  });

  it('should set the navigation header with a custom back button', () => {
    render(<PetScreen navigation={mockNavigation} route={mockRoute} />);
    expect(mockNavigation.setOptions).toHaveBeenCalledWith(
      expect.objectContaining({
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerLeft: expect.any(Function),
      }),
    );
    const {headerLeft} = mockNavigation.setOptions.mock.calls[0][0];
    const {getByTestId} = render(headerLeft());
    expect(getByTestId('back-button')).toBeTruthy();
    fireEvent.press(getByTestId('back-button'));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('should render all the pet details correctly', () => {
    render(<PetScreen navigation={mockNavigation} route={mockRoute} />);
    expect(screen.getByTestId("no-dog-image")).toBeTruthy();
    expect(screen.getByText("Buddy")).toBeTruthy();
    expect(screen.getByText("♂")).toBeTruthy();
    expect(screen.getByText("🐾About Buddy")).toBeTruthy();
    expect(screen.getByTestId("gender-id")).toBeTruthy();
    expect(screen.getByText("Brown")).toBeTruthy();

  });
});

describe('PetScreen Content', () => {
  const mockNavigation = { goBack: jest.fn(), navigate: jest.fn(), setOptions: jest.fn() };
  const mockRoute = {
    params: {
      pet: {
        name: 'Buddy',
        breed: 'Golden Retriever',
        emergencyContact: '9876543210',
        gender: 'Male',
        age: 5,
        weight: 20,
        height: 60,
        color: 'Golden',
        remarks: 'Friendly and playful.',
        image_uri: '',
      },
    },
  };
  const mockRoute1 = {
    params: {
      pet: {
        name: 'Buddy',
        breed: 'Golden Retriever',
        emergencyContact: '9876543210',
        gender: 'Male',
        age: 5,
        weight: 20,
        height: 60,
        color: 'Golden',
        remarks: 'Friendly and playful.',
        image_uri: 'image_uri',
      },
    },
  };

  it('renders the pet details correctly', () => {
    const { getByText, getByTestId } = render(
      <PetScreen navigation={mockNavigation} route={mockRoute1} />
    );

    expect(getByText('Buddy')).toBeTruthy();
    expect(getByText('+919876543210')).toBeTruthy();
    expect(getByText('Golden Retriever')).toBeTruthy();
    expect(getByTestId('dog-image')).toBeTruthy();
  });

  it('should navigate to Gallery screen on clicking "Gallery"', () => {
    const { getByText } = render(
      <PetScreen navigation={mockNavigation} route={mockRoute} />
    );

    const galleryButton = getByText('Gallery    >');
    fireEvent.press(galleryButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Gallery', { pet: mockRoute.params.pet });
  });

  it('should show TrackModal when Track button is pressed', () => {
    const { getByText } = render(
      <PetScreen navigation={mockNavigation} route={mockRoute} />
    );

    const trackButton = getByText('Track');
    fireEvent.press(trackButton);
    expect(getByText('Reminders')).toBeTruthy();
    expect(getByText('Activity')).toBeTruthy();
  });

  it('should close the track modal',()=>{
    const { getByTestId, queryByTestId } = render(
      <PetScreen navigation={mockNavigation} route={mockRoute} />
    );
    const trackButton = getByTestId('track-button');
    fireEvent.press(trackButton);
    const trackModal = getByTestId('track-modal');
    expect(trackModal).toBeTruthy();
    const overlay = getByTestId('track-modal');
    fireEvent.press(overlay);
    expect(queryByTestId('track-modal')).toBeNull(); 
  })
 
  it('should display an alert on iOS', async () => {
    Platform.OS = 'ios';
    const { getByTestId } = render(
      <PetScreen navigation={mockNavigation} route={mockRoute} />
    );

    const phoneText = getByTestId("phone-call");
    fireEvent.press(phoneText);

    expect(Alert.alert).toHaveBeenCalledWith('This feature is not available');
  });

  it('should request call permission and make a call on Android', async () => {
    Platform.OS = 'android';
    (Permissions.requestCallPermission as jest.Mock).mockResolvedValue(true);

    const { getByTestId } = render(
      <PetScreen navigation={mockNavigation} route={mockRoute}  />
    );

    const phoneText = getByTestId("phone-call");
    fireEvent.press(phoneText);

    await waitFor(() => {
      expect(Permissions.requestCallPermission).toHaveBeenCalled();
      expect(Linking.openURL).toHaveBeenCalledWith(`tel:+919876543210`);
    });
  });

  it('should request call permission and make a call on Android', async () => {
    Platform.OS = 'android';
    (Permissions.requestCallPermission as jest.Mock).mockResolvedValue(false);

    const { getByTestId } = render(
      <PetScreen navigation={mockNavigation} route={mockRoute}  />
    );

    const phoneText = getByTestId("phone-call");
    fireEvent.press(phoneText);

    await waitFor(() => {
      expect(Permissions.requestCallPermission).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Permission Denied','Please enable call permissions in your settings.');
    });
  });
  it('should display an alert when there is an error while making a call', async () => {
    Platform.OS = 'android';
    (Permissions.requestCallPermission as jest.Mock).mockResolvedValue(true);

    (Linking.openURL as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Failed to make a call');
    });
  
    const { getByTestId } = render(
      <PetScreen navigation={mockNavigation} route={mockRoute}  />
    );
  
    const phoneText = getByTestId("phone-call");
    fireEvent.press(phoneText);
  
    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalledWith(`tel:+919876543210`);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Unable to make a call. Please try again later.'
      );
    });
  });

});
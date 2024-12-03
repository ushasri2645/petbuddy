import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import GalleryScreen from '../src/screens/Gallery/GalleryScreen';
import * as Permissions from '../src/components/Permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import {API_URL} from '../API';
import {Alert} from 'react-native';

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

jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn(() =>
    Promise.resolve({path: 'path', mime: 'image/jpeg'}),
  ),
  openCamera: jest.fn(() =>
    Promise.resolve({path: 'path', mime: 'image/jpeg'}),
  ),
  clean: jest.fn(() => Promise.resolve()),
  cleanSingle: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-fs', () => ({
  readDir: jest.fn(() => Promise.resolve([])),
  readFile: jest.fn(() => Promise.resolve('MockBase64Image')),
  writeFile: jest.fn(() => Promise.resolve()),
  unlink: jest.fn(() => Promise.resolve()),
  mkdir: jest.fn(() => Promise.resolve()),
  moveFile: jest.fn(() => Promise.resolve()),
}));

jest.mock('./../src/components/Permissions', () => ({
  requestPhotoLibraryPermission: jest.fn(),
}));

Alert.alert = jest.fn();

global.fetch = jest.fn();

const mockRoute = {
  params: {
    pet: {name: 'Buddy'},
  },
};

describe('GalleryScreen Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders gallery screen with no images', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue([]),
    });

    const {getByText} = render(<GalleryScreen route={mockRoute} />);

    await waitFor(() => {
      expect(getByText('No Images Found. Please Add')).toBeTruthy();
    });
  });

  it('fetches and displays images from the server', async () => {
    const mockImages = ['image1', 'image2'];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok:true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockImages),
    });

    const {getAllByTestId} = render(<GalleryScreen route={mockRoute} />);

    await waitFor(() => {
      const images = getAllByTestId('gallery-image');
      expect(images).toHaveLength(mockImages.length);
      expect(images[0].props.source.uri).toBe(mockImages[0]);
    });
  });

  it('handles image upload successfully', async () => {
    (Permissions.requestPhotoLibraryPermission as jest.Mock).mockResolvedValue(
      true,
    );
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValue([]),
      })
      .mockResolvedValueOnce({status: 200});

    const {getByText} = render(<GalleryScreen route={mockRoute} />);

    const uploadButton = getByText('Add Image');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(Permissions.requestPhotoLibraryPermission).toHaveBeenCalledTimes(
        1,
      );
      expect(ImageCropPicker.openPicker).toHaveBeenCalledWith({
        width: 300,
        height: 400,
        cropping: true,
      });
      expect(RNFS.readFile).toHaveBeenCalledWith('path', 'base64');
      expect(fetch).toHaveBeenCalledWith(`${API_URL}pets/gallery/Buddy`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({path: 'data:image/jpeg;base64,MockBase64Image'}),
      });
    });
  });
  it('handles not image upload successfully', async () => {
    (Permissions.requestPhotoLibraryPermission as jest.Mock).mockResolvedValue(
      true,
    );
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValue([]),
      })
      .mockResolvedValueOnce({status: 400});

    const {getByText} = render(<GalleryScreen route={mockRoute} />);

    const uploadButton = getByText('Add Image');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(Permissions.requestPhotoLibraryPermission).toHaveBeenCalledTimes(
        1,
      );
      expect(ImageCropPicker.openPicker).toHaveBeenCalledWith({
        width: 300,
        height: 400,
        cropping: true,
      });
      expect(RNFS.readFile).toHaveBeenCalledWith('path', 'base64');
      expect(fetch).toHaveBeenCalledWith(`${API_URL}pets/gallery/Buddy`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({path: 'data:image/jpeg;base64,MockBase64Image'}),
      });
      expect(Alert.alert).toHaveBeenCalledWith(
        'Something went wrong, Try again later',
      );
    });
  });

  it('handles image uploading error ', async () => {
    (Permissions.requestPhotoLibraryPermission as jest.Mock).mockResolvedValue(
      true,
    );
    (fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('Error fetching images'))
      .mockRejectedValueOnce(new Error('DB Error'));

    const {getByText} = render(<GalleryScreen route={mockRoute} />);

    const uploadButton = getByText('Add Image');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(Permissions.requestPhotoLibraryPermission).toHaveBeenCalledTimes(
        1,
      );
      expect(ImageCropPicker.openPicker).toHaveBeenCalledWith({
        width: 300,
        height: 400,
        cropping: true,
      });
      expect(RNFS.readFile).toHaveBeenCalledWith('path', 'base64');
      expect(fetch).toHaveBeenCalledWith(`${API_URL}pets/gallery/Buddy`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({path: 'data:image/jpeg;base64,MockBase64Image'}),
      });
      expect(Alert.alert).toHaveBeenCalledWith('Error: DB Error');
    });
  });

  it('shows alert when permission is denied', async () => {
    (Permissions.requestPhotoLibraryPermission as jest.Mock).mockResolvedValue(
      false,
    );

    const {getByText} = render(<GalleryScreen route={mockRoute} />);

    const uploadButton = getByText('Add Image');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(Permissions.requestPhotoLibraryPermission).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  it('handles image picker cancellation', async () => {
    (Permissions.requestPhotoLibraryPermission as jest.Mock).mockResolvedValue(
      true,
    );
    (ImageCropPicker.openPicker as jest.Mock).mockRejectedValue({
      code: 'E_PICKER_CANCELLED',
    });

    const {getByText} = render(<GalleryScreen route={mockRoute} />);

    const uploadButton = getByText('Add Image');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(Permissions.requestPhotoLibraryPermission).toHaveBeenCalledTimes(
        1,
      );
      expect(ImageCropPicker.openPicker).toHaveBeenCalled();
    });
  });

  it('handles unknown errors during image picking', async () => {
    (Permissions.requestPhotoLibraryPermission as jest.Mock).mockResolvedValue(
      true,
    );
    (ImageCropPicker.openPicker as jest.Mock).mockRejectedValue({
      code: 'UNKNOWN_ERROR',
      message: 'Some error occurred',
    });

    const {getByText} = render(<GalleryScreen route={mockRoute} />);

    const uploadButton = getByText('Add Image');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(Permissions.requestPhotoLibraryPermission).toHaveBeenCalledTimes(
        1,
      );
      expect(ImageCropPicker.openPicker).toHaveBeenCalled();
    });
  });
});

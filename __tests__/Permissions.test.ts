import {
  requestCallPermission,
  requestPhotoLibraryPermission,
} from '../src/components/Permissions';
import {Alert, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

jest.mock('react-native-permissions', () => ({
  check: jest.fn(),
  request: jest.fn(),
  PERMISSIONS: {
    IOS: {PHOTO_LIBRARY: 'ios-photo-library'},
    ANDROID: {
      READ_EXTERNAL_STORAGE: 'android-read-external-storage',
      CALL_PHONE: 'android-call-phone',
    },
  },
  RESULTS: {DENIED: 'denied', GRANTED: 'granted', LIMITED: 'limited'},
}));

jest.mock('react-native', () => ({
  Alert: {alert: jest.fn()},
  Platform: {OS: 'android'},
}));

describe('Permissions Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('iOS Photo Library Permission', () => {
    beforeAll(() => {
      Platform.OS = 'ios';
    });

    it('should test permission granted', async () => {
      (check as jest.Mock).mockResolvedValueOnce(RESULTS.GRANTED);
      const result = await requestPhotoLibraryPermission();
      expect(result).toBe(true);
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('should check permission denied, requesting permission granted', async () => {
      (check as jest.Mock).mockResolvedValueOnce(RESULTS.DENIED);
      (request as jest.Mock).mockResolvedValueOnce(RESULTS.GRANTED);
      const result = await requestPhotoLibraryPermission();
      expect(result).toBe(true);
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('should check  permission denied, requesting permission denied', async () => {
      (check as jest.Mock).mockResolvedValueOnce(RESULTS.DENIED);
      (request as jest.Mock).mockResolvedValueOnce(RESULTS.DENIED);
      const result = await requestPhotoLibraryPermission();
      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Permission Denied',
        'Photo Library access is required.',
      );
    });

    it('should check permission limited, requesting permission granted', async () => {
      (check as jest.Mock).mockResolvedValueOnce(RESULTS.LIMITED);
      (request as jest.Mock).mockResolvedValueOnce(RESULTS.GRANTED);
      const result = await requestPhotoLibraryPermission();
      expect(result).toBe(true);
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('should check permission limited, requesting permission denied', async () => {
      (check as jest.Mock).mockResolvedValueOnce(RESULTS.LIMITED);
      (request as jest.Mock).mockResolvedValueOnce(RESULTS.DENIED);
      const result = await requestPhotoLibraryPermission();
      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Permission Denied',
        'Photo Library access is required.',
      );
    });

    it('error checking permission', async () => {
      (check as jest.Mock).mockRejectedValueOnce(
        new Error('Permission check failed'),
      );
      const result = await requestPhotoLibraryPermission();
      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'An error occurred while checking Photo Library permission.',
      );
    });
  });
  describe('Android Photo Library Permission', () => {
    beforeAll(() => {
      Platform.OS = 'android';
    });

    it('permission granted', async () => {
      (check as jest.Mock).mockResolvedValueOnce(RESULTS.GRANTED);
      const result = await requestPhotoLibraryPermission();
      expect(result).toBe(true);
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('permission denied, requesting permission granted', async () => {
      (check as jest.Mock).mockResolvedValueOnce(RESULTS.DENIED);
      (request as jest.Mock).mockResolvedValueOnce(RESULTS.GRANTED);
      const result = await requestPhotoLibraryPermission();
      expect(result).toBe(true);
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('permission denied, requesting permission denied', async () => {
      (check as jest.Mock).mockResolvedValueOnce(RESULTS.DENIED);
      (request as jest.Mock).mockResolvedValueOnce(RESULTS.DENIED);
      const result = await requestPhotoLibraryPermission();
      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Permission Denied',
        'Photo Library access is required.',
      );
    });

    it('error checking permission', async () => {
      (check as jest.Mock).mockRejectedValueOnce(
        new Error('Permission check failed'),
      );
      const result = await requestPhotoLibraryPermission();
      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'An error occurred while checking Photo Library permission.',
      );
    });
  });


  describe('Android Call Permission', () => {
    beforeAll(() => {
      Platform.OS = 'android';
    });

    it('should check permission granted', async () => {
      (check as jest.Mock).mockResolvedValueOnce(RESULTS.GRANTED);
      const result = await requestCallPermission();
      expect(result).toBe(true);
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('should check permission denied, requesting permission granted', async () => {
      (check as jest.Mock).mockResolvedValueOnce(RESULTS.DENIED);
      (request as jest.Mock).mockResolvedValueOnce(RESULTS.GRANTED);
      const result = await requestCallPermission();
      expect(result).toBe(true);
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('should check permission denied, requesting permission denied', async () => {
      (check as jest.Mock).mockResolvedValueOnce(RESULTS.DENIED);
      (request as jest.Mock).mockResolvedValueOnce(RESULTS.DENIED);
      const result = await requestCallPermission();
      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Permission Denied',
        'Call access is required.',
      );
    });

    it('error checking permission', async () => {
      (check as jest.Mock).mockRejectedValueOnce(
        new Error('Permission check failed'),
      );
      const result = await requestCallPermission();
      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'An error occurred while checking Call permission.',
      );
    });
  });
});

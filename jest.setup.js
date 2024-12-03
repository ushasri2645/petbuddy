jest.mock('react-native-permissions', () => {
    const actualPermissions = jest.requireActual('react-native-permissions');
    return {
      ...actualPermissions,
      check: jest.fn(() => Promise.resolve('granted')),
      request: jest.fn(() => Promise.resolve('granted')),
      PERMISSIONS: {
        IOS: {
          PHOTO_LIBRARY: 'ios.permission.PHOTO_LIBRARY',
        },
        ANDROID: {
          WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
        },
      },
      RESULTS: {
        GRANTED: 'granted',
        DENIED: 'denied',
        BLOCKED: 'blocked',
      },
    };
  });
  
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('An update to') &&
    args[0].includes('act')
  ) {
    return;
  }
  originalError(...args); 
};
